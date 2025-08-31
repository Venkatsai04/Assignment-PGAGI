import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SourceCard = ({ source, id, textClass, inactiveClass, bgClass }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex items-center gap-4 ${bgClass} px-4 min-h-[72px] py-2 rounded-lg`}
    >
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-14 h-14"
        style={{ backgroundImage: `url(${source.image})` }}
      />
      <div className="flex flex-col justify-center">
        <p className={`${inactiveClass} text-sm line-clamp-1 font-bold`}>
          {source.subtitle}
        </p>
      </div>
    </div>
  );
};

const SourcePage = () => {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const SourcePageBgClass = isDarkMode ? "bg-[#090030]" : "bg-amber-50";
  const SourcePageTextBaseClass = isDarkMode ? "text-white" : "text-black";
  const SourcePageTextInactiveClass = isDarkMode ? "text-[#adadad]" : "text-gray-600";

  // One channel pre-selected in Your Preferences
  const [yourSources, setYourSources] = useState(
    JSON.parse(localStorage.getItem("yourSources")) || [
      {
        id: "1",
        title: "Washington Post",
        subtitle: "Washington Post",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Washington_Post_logo.png",
      },
    ]
  );

  const [availableSources, setAvailableSources] = useState(
    JSON.parse(localStorage.getItem("availableSources")) || [
      {
        id: "2",
        title: "BBC",
        subtitle: "BBC",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/BBC_News_2019.svg",
      },
      {
        id: "3",
        title: "CNN",
        subtitle: "CNN",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg",
      },
      {
        id: "4",
        title: "Al Jazeera",
        subtitle: "Al Jazeera",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Aljazeera.svg",
      },
      {
        id: "5",
        title: "The Guardian",
        subtitle: "The Guardian",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/80/The_Guardian_2018.svg",
      },
    ]
  );

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } })
  );

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("yourSources", JSON.stringify(yourSources));
    localStorage.setItem("availableSources", JSON.stringify(availableSources));
  }, [yourSources, availableSources]);

  const findContainer = (id) => {
    if (yourSources.find((s) => s.id === id)) return "your";
    if (availableSources.find((s) => s.id === id)) return "available";
    return null;
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (activeContainer && overContainer && activeContainer !== overContainer) {
      if (activeContainer === "available") {
        const item = availableSources.find((s) => s.id === active.id);
        setAvailableSources((prev) => prev.filter((s) => s.id !== active.id));
        setYourSources((prev) => [...prev, item]);
      } else {
        const item = yourSources.find((s) => s.id === active.id);
        setYourSources((prev) => prev.filter((s) => s.id !== active.id));
        setAvailableSources((prev) => [...prev, item]);
      }
    }
  };

  const handleDragEnd = () => setActiveId(null);

  return (
    <div
      className={`relative flex min-h-screen flex-col ${SourcePageBgClass} overflow-x-hidden`}
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif"' }}
    >
      <h2 className={`${SourcePageTextBaseClass} text-lg font-bold text-center pt-4`}>
        Sources
      </h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="px-4">
          <h3 className={`${SourcePageTextBaseClass} text-lg font-bold pt-4`}>Your Preferences</h3>
          <SortableContext items={yourSources.map((s) => s.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-col gap-2">
              {yourSources.map((source) => (
                <SourceCard
                  key={source.id}
                  id={source.id}
                  source={source}
                  textClass={SourcePageTextBaseClass}
                  inactiveClass={SourcePageTextInactiveClass}
                  bgClass={SourcePageBgClass}
                />
              ))}
            </div>
          </SortableContext>

          <h3 className={`${SourcePageTextBaseClass} text-lg font-bold pt-4`}>Available Sources</h3>
          <SortableContext items={availableSources.map((s) => s.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-col gap-2 pb-4">
              {availableSources.map((source) => (
                <SourceCard
                  key={source.id}
                  id={source.id}
                  source={source}
                  textClass={SourcePageTextBaseClass}
                  inactiveClass={SourcePageTextInactiveClass}
                  bgClass={SourcePageBgClass}
                />
              ))}
            </div>
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId && (
            <div className="rounded-lg px-4 py-2 bg-black/80 text-white">
              {yourSources.concat(availableSources).find((s) => s.id === activeId)?.subtitle}
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <p className="absolute bottom-2 left-2 text-xs text-gray-400">
        Drag and drop channels to customize your preferences
      </p>
    </div>
  );
};

export default SourcePage;
