import React, { useEffect, useState, useMemo } from 'react';
import Header from './reuseableComponents/Header';
import FilterBar from './reuseableComponents/FilterBar';
import ContentCard from './reuseableComponents/ContentCard';
import BottomNav from './reuseableComponents/BottomNav';
import SortableCard from './reuseableComponents/SortableCard';

import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import SourcePage from './pages/SourcePage';
import CustuomizePage from './pages/CustuomizePage';
import SettingsPage from './pages/SettingsPage';
import Recommendations from './pages/Recommendations ';
import Favorites from './pages/Favorites';
import { motion, AnimatePresence } from "framer-motion";


import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function App() {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // ⬅ Track current page

  const API_KEY = '30a0fa0bb3e540128e9cd28a8fa399d7';
  // const API_KEY = import.meta.env.NEWS_API_KEY;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !!isDarkMode);
  }, [isDarkMode]);

  const orderKey = useMemo(
    () => `cx-order:${selectedCategory}:${searchTerm || 'all'}`,
    [selectedCategory, searchTerm]
  );

  const fetchNews = async (append = false) => {
    try {
      setLoading(true);
      let categoryParam =
        selectedCategory === 'All' ? 'general' : selectedCategory.toLowerCase();
      if (categoryParam === 'news') categoryParam = 'general';
      if (categoryParam === 'finance') categoryParam = 'business';
      if (categoryParam === 'tech') categoryParam = 'technology';

      const queryParam = searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : '';
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${categoryParam}${queryParam}&page=${page}&pageSize=10&apiKey=${API_KEY}`
      );
      const data = await res.json();

      const withIds = (data.articles || []).map((a, idx) => ({
        ...a,
        _id: a.url || `${a.publishedAt || 'na'}-${idx}`
      }));

      if (!append) {
        const savedOrder = JSON.parse(localStorage.getItem(orderKey) || '[]');
        if (savedOrder.length) {
          const map = new Map(withIds.map(a => [a._id, a]));
          const reOrdered = savedOrder.map(id => map.get(id)).filter(Boolean);
          const remaining = withIds.filter(a => !savedOrder.includes(a._id));
          setArticles([...reOrdered, ...remaining]);
        } else {
          setArticles(withIds);
        }
      } else {
        setArticles(prev => [...prev, ...withIds]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    fetchNews(page > 1); 
  }, [page, selectedCategory, searchTerm]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading) {
          setPage(prev => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = articles.findIndex(i => i._id === active.id);
    const newIndex = articles.findIndex(i => i._id === over.id);

    const newOrder = arrayMove(articles, oldIndex, newIndex);
    setArticles(newOrder);
    localStorage.setItem(orderKey, JSON.stringify(newOrder.map(a => a._id)));
  };

  const appBgClassSpl = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';

  return (
    <div className={`relative flex size-full min-h-screen flex-col ${appBgClassSpl} justify-between overflow-x-hidden`}>
      <div className="fixed top-0 w-full z-10">
        <Header onSearch={(term) => setSearchTerm(term)} />
      </div>

      <div className="flex-1 overflow-y-auto mt-[75px] pb-[70px]">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FilterBar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={articles.map(a => a._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                      <AnimatePresence>
                        {articles.length ? (
                          articles.map((item) => (
                            <motion.div
                              key={item._id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              whileHover={{
                                scale: 1.02,
                                boxShadow: "0px 4px 20px rgba(0,0,0,0.15)"
                              }}
                            >
                              <SortableCard id={item._id} className="@container">
                                <ContentCard
                                  id={item._id}
                                  imageUrl={item.urlToImage}
                                  title={item.title}
                                  description={item.description}
                                  source={item.source?.name}
                                  url={item.url}
                                  hoursAgo={Math.floor(
                                    (Date.now() - new Date(item.publishedAt)) / 3600000
                                  )}
                                />
                              </SortableCard>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 col-span-full">
                            No results found.
                          </p>
                        )}
                      </AnimatePresence>

                    </div>
                  </SortableContext>
                </DndContext>
               {loading && <Spinner />}
              </>
            }
          />
          <Route path="/sources" element={<SourcePage />} />
          <Route path="/customize" element={<CustuomizePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/Recommendations" element={<Recommendations />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </div>

      <BottomNav />
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      className="flex justify-center items-center p-4"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </motion.div>
  );
}


export default App;