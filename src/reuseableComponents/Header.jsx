import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import SearchIcon from '../icons/SearchIcon';
import { FiMenu } from 'react-icons/fi'; 
import Sidebar from './Sidebar'; 

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const headerBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
  const headerTextClass = isDarkMode ? 'text-white' : 'text-black';

  return (
    <>
      <div className={`flex items-center ${headerBgClass} p-4 pb-2 justify-between`}>
        {/* Left Section with Hamburger */}
        <div className="flex items-center gap-3">
          <h2 className={`${headerTextClass} text-xl font-bold leading-tight tracking-[-0.015em]`}>
            Content<span className="text-red-600">X</span>
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end space-x-2">
           <button className={`flex items-center justify-center h-12 ${headerTextClass}`}>
            <SearchIcon className={`${headerTextClass}`} />
          </button>
          <ThemeToggle />
           <button onClick={() => setIsSidebarOpen(true)}>
            <FiMenu size={24} className={headerTextClass} />
          </button>
        </div>
        
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
