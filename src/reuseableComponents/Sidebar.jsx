// src/components/Sidebar.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = ({ isOpen, onClose }) => {

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const bgClass = isDarkMode ? 'bg-[#090030] text-white' : 'bg-amber-50 text-black';

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 ${bgClass} shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold text-lg">Menu</h2>
        <button onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <img
            src="user.svg"
            alt="User"
            className="rounded-full w-12 h-12"
          />
          <div>
            <h3 className="font-semibold">Albert Einsten</h3>
            <p className="text-sm text-gray-500">Albert@Einsten.com</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 space-y-2">
        <Link to="/sources" onClick={onClose}>
          <button className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-300">
            Preferences
          </button>
        </Link>
        <Link to="/customize" onClick={onClose}>
          <button className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-300">
            Customize
          </button>
        </Link>
        <Link to='/settings' onClick={onClose}>
          <button className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-300">
            Settigns
          </button>
        </Link >
      
      </div>
    </div>
  );
};

export default Sidebar;
