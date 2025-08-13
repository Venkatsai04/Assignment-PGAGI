import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from './reuseableComponents/Header';
import FilterBar from './reuseableComponents/FilterBar';
import ContentCard from './reuseableComponents/ContentCard';
import BottomNav from './reuseableComponents/BottomNav';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import SourcePage from './pages/SourcePage';
import CustuomizePage from './pages/CustuomizePage';
import SettingsPage from './pages/SettingsPage';
import Recommendations from './pages/Recommendations ';
import Favorites from './pages/Favorites';

function App() {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const apiKey = '125b498ba5134cf0a375e40a52d32a70';

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fetchNews = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      let categoryParam =
        selectedCategory === 'All' ? 'general' : selectedCategory.toLowerCase();

      if (categoryParam === 'news') categoryParam = 'general';
      if (categoryParam === 'finance') categoryParam = 'business';
      if (categoryParam === 'tech') categoryParam = 'technology';

      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${categoryParam}&pageSize=10&page=${page}&apiKey=${apiKey}`
      );
      const data = await res.json();

      if (data.articles?.length) {
        setArticles(prev => [...prev, ...data.articles]);
      }
      if (data.articles?.length < 10) {
        setHasMore(false); // No more pages
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, page, loading]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  const appBgClassSpl = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';

  return (
    <div className={`relative flex size-full min-h-screen flex-col ${appBgClassSpl} justify-between overflow-x-hidden`}>
      <div className="fixed top-0 w-full z-10">
        <Header />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {articles.map((item, idx) => (
                    <div key={idx} className="@container">
                      <ContentCard
                        id={idx}
                        imageUrl={item.urlToImage}
                        title={item.title}
                        description={item.description}
                        source={item.source?.name}
                        url={item.url}
                        hoursAgo={Math.floor(
                          (Date.now() - new Date(item.publishedAt)) / 3600000
                        )}
                      />
                    </div>
                  ))}
                </div>
                {loading && <div className="p-4 text-center text-gray-500">Loading more...</div>}
                <div ref={observerRef} style={{ height: "1px" }} />
              </>
            }
          />
          <Route path="/home" element={<App />} />
          <Route path="/sources" element={<SourcePage />} />
          <Route path="/customize" element={<CustuomizePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/Recommendations" element={<Recommendations />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </div>

      <div>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
