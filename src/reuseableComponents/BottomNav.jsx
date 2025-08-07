import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../icons/HomeIcon';
import ListBulletsIcon from '../icons/ListBulletsIcon';
import MagicWandIcon from '../icons/MagicWandIcon';
import GearIcon from '../icons/GearIcon';
import { useSelector } from 'react-redux';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const footerBarBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
  const footerBarTextBaseClass = isDarkMode ? 'text-white' : 'text-black';
  const footerBarTextInactiveClass = isDarkMode ? 'text-[#adadad]' : 'text-gray-600';

  return (
    <div className={`flex gap-2 border-t border-[#363636] ${footerBarBgClass} px-4 pb-3 pt-2 fixed bottom-0 w-full z-10`}>
      <Link
        className={`flex flex-1 flex-col items-center justify-end gap-1 rounded-full ${
          isActive('/') ? footerBarTextBaseClass : footerBarTextInactiveClass
        }`}
        to="/"
      >
        <div className={`flex h-8 items-center justify-center`}>
          <HomeIcon className="w-6 h-6" />
        </div>
        <p className={`text-xs font-medium leading-normal tracking-[0.015em]`}>Home</p>
      </Link>

      <Link
        className={`flex flex-1 flex-col items-center justify-end gap-1 rounded-full ${
          isActive('/sources') ? footerBarTextBaseClass : footerBarTextInactiveClass
        }`}
        to="/sources"
      >
        <div className={`flex h-8 items-center justify-center`}>
          <ListBulletsIcon className="w-6 h-6" />
        </div>
        <p className={`text-xs font-medium leading-normal tracking-[0.015em]`}>Sources</p>
      </Link>

      <Link
        className={`flex flex-1 flex-col items-center justify-end gap-1 rounded-full ${
          isActive('/customize') ? footerBarTextBaseClass : footerBarTextInactiveClass
        }`}
        to="/customize"
      >
        <div className={`flex h-8 items-center justify-center`}>
          <MagicWandIcon className="w-6 h-6" />
        </div>
        <p className={`text-xs font-medium leading-normal tracking-[0.015em]`}>Customize</p>
      </Link>

      <Link
        className={`flex flex-1 flex-col items-center justify-end gap-1 rounded-full ${
          isActive('/settings') ? footerBarTextBaseClass : footerBarTextInactiveClass
        }`}
        to="/settings"
      >
        <div className={`flex h-8 items-center justify-center`}>
          <GearIcon className="w-6 h-6" />
        </div>
        <p className={`text-xs font-medium leading-normal tracking-[0.015em]`}>Settings</p>
      </Link>
    </div>
  );
};

export default BottomNav;