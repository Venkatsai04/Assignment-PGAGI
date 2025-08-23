import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const sourcesList = [
  { id: "1", name: "BBC" },
  { id: "2", name: "CNN" },
  { id: "3", name: "TechCrunch" },
  { id: "4", name: "The Verge" },
];

export default function CustomizeSources() {
  const [available, setAvailable] = useState(sourcesList);
  const [selected, setSelected] = useState([]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = source.droppableId === "available" ? available : selected;
    const destList = destination.droppableId === "available" ? available : selected;
    const setSourceList =
      source.droppableId === "available" ? setAvailable : setSelected;
    const setDestList =
      destination.droppableId === "available" ? setAvailable : setSelected;

    const [moved] = sourceList.splice(source.index, 1);
    setSourceList([...sourceList]);
    destList.splice(destination.index, 0, moved);
    setDestList([...destList]);
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Available Sources */}
        <Droppable droppableId="available">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 rounded-2xl shadow bg-white"
            >
              <h2 className="text-lg font-semibold mb-4">Available Sources</h2>
              {available.map((src, index) => (
                <Draggable key={src.id} draggableId={src.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 mb-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                    >
                      {src.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Selected Sources */}
        <Droppable droppableId="selected">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 rounded-2xl shadow bg-white"
            >
              <h2 className="text-lg font-semibold mb-4">Selected Sources</h2>
              {selected.map((src, index) => (
                <Draggable key={src.id} draggableId={src.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 mb-2 rounded-xl bg-green-100 hover:bg-green-200 transition"
                    >
                      {src.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
