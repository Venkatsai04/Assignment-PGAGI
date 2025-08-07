// src/components/Header.jsx
import React from 'react';
import SearchIcon from '../icons/SearchIcon';
import ThemeToggle from './ThemeToggle'; 
import { useSelector } from 'react-redux';


const Header = () => {

  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const headerBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
  const headerTextClass = isDarkMode ? 'text-white' : 'text-black';
  // const headerTextClassSpcl = isDarkMode ? 'text-yellow-400' : 'text-black';

  return (
    <div className={`flex items-center ${headerBgClass} p-4 pb-2 justify-between`}>
      <div className={`${headerTextClass} flex size-12 shrink-0 items-center justify-start`}> 
        <h2 className={`${headerTextClass} text-xl font-bold leading-tight tracking-[-0.015em]`}>
          Content<span className='text-red-600'>X</span>
        </h2>
      </div>
      <div className="flex items-center justify-end space-x-2"> 
        <ThemeToggle />
        <button className={`flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent ${headerTextClass} gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0`}>
          <SearchIcon className={`${headerTextClass}`} />
        </button>
      </div>
    </div>
  );
};

export default Header;