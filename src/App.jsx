import React, { useEffect } from 'react';
import Header from './reuseableComponents/Header';
import FilterBar from './reuseableComponents/FilterBar';
import ContentCard from './reuseableComponents/ContentCard';
import BottomNav from './reuseableComponents/BottomNav';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import SourcePage from './pages/SourcePage';
import CustuomizePage from './pages/CustuomizePage';
import SettingsPage from './pages/SettingsPage';

const contentData = [
  {
    id: 1,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo9swDdHWlUEpyyjmln-svM1fsOxf92_BUc_45rnnZOg6r5Rw-dZ7b9Nw69BLnhcGkEb6qTnh6QcjwzfppgBucXyTa1TLpDldOyc-W2BkeG0cryceZfqauksxBcWOdQspYqwNqwATDmaadoqz1ybS9T1Bbll2VLgfaKPWo0SlFex_47eaM5CSolACSqsuDIb85OkYDJNGk2LlFcgfRwNh887szX2wkFNtpkDrFDQibYsDz43xd5JFCeOUfmrHNC3wl4XiNf3HiyaOf",
    title: "Tech Breakthrough: New AI Unveiled",
    description: "A new AI technology has been unveiled, promising to change the way we interact with devices.",
    readTime: "2 min read",
  },
  {
    id: 2,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC_YkGHUgtzJ6-4HB9yItzjPMpGBrl_b-xbD7_-ap7Ul1t0lGWqLrfWLWp8EiblEGe7Q-grF94vGDvlTZDUpYLaLlM4z6hsuF71rTIDn5dG0oJJXlw0HhKUt07_QoQSEg_JbO_jb4jD1tz0CC3gJVQkyTZhp6DWuSk76EKRuUc1lGDBvDb1k18Xbp2ZEzvOFCH9ODc39SwxCy5I7K4yzr8hXZ7yaSQP_jjtwDns9UBaKLSXVY0CW9qRN_TlGRkJkElPBjbR2XTQWMZ",
    title: "Top 5 Travel Destinations for 2024",
    description: "Explore the most sought-after travel spots this year, from exotic beaches to historical landmarks.",
    readTime: "5 min read",
  },
  {
    id: 3,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEJA1M1eVp0RpktmYxGayCn8bKfdNb0pc_s168lOfsy_tspjVwIa0kMY_j5ijusr-OF4gl_SiKpSo2l56CGw-aXVhWRuzX3N_fzIIoQSv7B9KgdUV-40JUUarQiTAUbeas9VlxJ8calfKIkjkqSFWv3z8ResEJ8vd26V1qSs6ZSrEYJmBUML7X3bypLOGuGgS8B6pTkrGnxFxkssvJdEDDH9B19dIoOwYT2QyWFWYD_s5O44FXqGmOoVMN_sMnNGlFynAaJvbx6CKJ",
    title: "Healthy Eating Tips for a Balanced Diet",
    description: "Learn how to maintain a healthy lifestyle with simple dietary changes and nutritious recipes.",
    readTime: "3 min read",
  },
  {
    id: 4,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYevXwE34EkRIl3_7ZOBG52zxGAKFbjWmD4g4OV2ZJGo8VFRIvOHHPa8FpUqDtcxyjtnHx88nn0yvsIQj1Q3bQdyoREvAGgYkKAi5J4rMBB4xIVWor5oiBIINjsakSrG5CIeFnQXdNnJBXPI91fW029WULmSmOuLt2FKo4holYsXOI62IP4YCP2tPJQsKdB45fC5m3b4PjMDU-epb7hFuXQykDEMiEvk2u3o5OzjMDba7QsXNMWtrpSpz-Sum3kMQEkZUl70enLpnY",
    title: "The Future of Renewable Energy",
    description: "An in-depth look at the advancements in renewable energy and its impact on the environment.",
    readTime: "4 min read",
  },
  {
    id: 5,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIQsirOPrjH1JeFZpUs8NIpAP6ymrbt_0lQoxtUcIvPOKi4FSPgafs74VmlDwAJyJRCnzuvYrW_zd62EwCkXt-afsQ1XUDaIBzGB_Foh69kwTaTL8vnAzR-CqVYe_OLTvV2-c5Xg-T8pisWV7zInKnowl1ks7HOIAm-e0xJ47mMLDTXaaFKdxPzglTgyO1UjxZl_HR2S8INAyFrv2O5sysSgeIgzJpXUnhyGSx_5Za3EYL1Nev07vT6JYqX3xGtmd22m9a2WudaIR7",
    title: "Mastering the Art of Photography",
    description: "Tips and techniques to improve your photography skills, from basic settings to advanced composition.",
    readTime: "6 min read",
  },
  {
    id: 6,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo9swDdHWlUEpyyjmln-svM1fsOxf92_BUc_45rnnZOg6r5Rw-dZ7b9Nw69BLnhcGkEb6qTnh6QcjwzfppgBucXyTa1TLpDldOyc-W2BkeG0cryceZfqauksxBcWOdQspYqwNqwATDmaadoqz1ybS9T1Bbll2VLgfaKPWo0SlFex_47eaM5CSolACSqsuDIb85OkYDJNGk2LlFcgfRwNh887szX2wkFNtpkDrFDQibYsDz43xd5JFCeOUfmrHNC3wl4XiNf3HiyaOf",
    title: "Tech Breakthrough: New AI Unveiled",
    description: "A new AI technology has been unveiled, promising to change the way we interact with devices.",
    readTime: "2 min read",
  },
  {
    id: 7,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC_YkGHUgtzJ6-4HB9yItzjPMpGBrl_b-xbD7_-ap7Ul1t0lGWqLrfWLWp8EiblEGe7Q-grF94vGDvlTZDUpYLaLlM4z6hsuF71rTIDn5dG0oJJXlw0HhKUt07_QoQSEg_JbO_jb4jD1tz0CC3gJVQkyTZhp6DWuSk76EKRuUc1lGDBvDb1k18Xbp2ZEzvOFCH9ODc39SwxCy5I7K4yzr8hXZ7yaSQP_jjtwDns9UBaKLSXVY0CW9qRN_TlGRkJkElPBjbR2XTQWMZ",
    title: "Top 5 Travel Destinations for 2024",
    description: "Explore the most sought-after travel spots this year, from exotic beaches to historical landmarks.",
    readTime: "5 min read",
  },
  {
    id:83,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEJA1M1eVp0RpktmYxGayCn8bKfdNb0pc_s168lOfsy_tspjVwIa0kMY_j5ijusr-OF4gl_SiKpSo2l56CGw-aXVhWRuzX3N_fzIIoQSv7B9KgdUV-40JUUarQiTAUbeas9VlxJ8calfKIkjkqSFWv3z8ResEJ8vd26V1qSs6ZSrEYJmBUML7X3bypLOGuGgS8B6pTkrGnxFxkssvJdEDDH9B19dIoOwYT2QyWFWYD_s5O44FXqGmOoVMN_sMnNGlFynAaJvbx6CKJ",
    title: "Healthy Eating Tips for a Balanced Diet",
    description: "Learn how to maintain a healthy lifestyle with simple dietary changes and nutritious recipes.",
    readTime: "3 min read",
  },
  {
    id: 44,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYevXwE34EkRIl3_7ZOBG52zxGAKFbjWmD4g4OV2ZJGo8VFRIvOHHPa8FpUqDtcxyjtnHx88nn0yvsIQj1Q3bQdyoREvAGgYkKAi5J4rMBB4xIVWor5oiBIINjsakSrG5CIeFnQXdNnJBXPI91fW029WULmSmOuLt2FKo4holYsXOI62IP4YCP2tPJQsKdB45fC5m3b4PjMDU-epb7hFuXQykDEMiEvk2u3o5OzjMDba7QsXNMWtrpSpz-Sum3kMQEkZUl70enLpnY",
    title: "The Future of Renewable Energy",
    description: "An in-depth look at the advancements in renewable energy and its impact on the environment.",
    readTime: "4 min read",
  },
  {
    id:45,
    hoursAgo: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIQsirOPrjH1JeFZpUs8NIpAP6ymrbt_0lQoxtUcIvPOKi4FSPgafs74VmlDwAJyJRCnzuvYrW_zd62EwCkXt-afsQ1XUDaIBzGB_Foh69kwTaTL8vnAzR-CqVYe_OLTvV2-c5Xg-T8pisWV7zInKnowl1ks7HOIAm-e0xJ47mMLDTXaaFKdxPzglTgyO1UjxZl_HR2S8INAyFrv2O5sysSgeIgzJpXUnhyGSx_5Za3EYL1Nev07vT6JYqX3xGtmd22m9a2WudaIR7",
    title: "Mastering the Art of Photography",
    description: "Tips and techniques to improve your photography skills, from basic settings to advanced composition.",
    readTime: "6 min read",
  },
];

function App() {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const appBgClass = isDarkMode ? 'bg-black' : 'bg-amber-50';
  const appBgClassSpl = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';



  return (
    <div
      className={`relative flex size-full min-h-screen flex-col ${appBgClassSpl} justify-between group/design-root overflow-x-hidden`}
    >
      <div className='fixed top-0 w-full z-10'>
        <Header />
      </div>

      <div className='flex-1 overflow-y-auto mt-[75px] pb-[70px]'>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FilterBar />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {contentData.map((item) => (
                    <div key={item.id} className="@container">
                      <ContentCard 
                        id = {item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        description={item.description}
                        readTime={item.readTime}
                        hoursAgo={item.hoursAgo}
                      />
                    </div>
                  ))}

                </div>
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