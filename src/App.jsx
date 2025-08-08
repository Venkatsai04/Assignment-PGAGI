import React, { useEffect, useState } from 'react';
import Header from './reuseableComponents/Header';
import FilterBar from './reuseableComponents/FilterBar';
import ContentCard from './reuseableComponents/ContentCard';
import BottomNav from './reuseableComponents/BottomNav';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import SourcePage from './pages/SourcePage';
import CustuomizePage from './pages/CustuomizePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = '125b498ba5134cf0a375e40a52d32a70'

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let categoryParam =
          selectedCategory === 'All' ? 'general' : selectedCategory.toLowerCase();

        // Map categories to NewsAPI ones
        if (categoryParam === 'news') categoryParam = 'general';
        if (categoryParam === 'finance') categoryParam = 'business';
        if (categoryParam === 'tech') categoryParam = 'technology';

        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${categoryParam}&apiKey=${apiKey}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  const appBgClassSpl = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';

  return (
    <div
      className={`relative flex size-full min-h-screen flex-col ${appBgClassSpl} justify-between overflow-x-hidden`}
    >
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
                {loading ? (
                  <div className="p-4 text-center text-gray-500">Loading news...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {articles.map((item, idx) => (
                      <div key={idx} className="@container">
                        <ContentCard
                          id={idx}
                          imageUrl={item.urlToImage}
                          title={item.title}
                          description={item.description}
                          readTime={item.source?.name}
                          hoursAgo={Math.floor(
                            (Date.now() - new Date(item.publishedAt)) / 3600000
                          )}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            }
          />
          <Route path="/home" element={<App />} />
          <Route path="/sources" element={<SourcePage />} />
          <Route path="/customize" element={<CustuomizePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>

      <div>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
