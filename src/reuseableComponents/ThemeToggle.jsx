// src/components/ThemeToggle.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../redux/store.js';
import SunIcon from '../icons/SunIcon.jsx';
import MoonIcon from '../icons/MoonIcon.jsx';

function ThemeToggle() {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`w-14 h-8 rounded-full flex items-center transition-colors duration-300 px-1
          ${isDarkMode ? 'bg-blue-600' : 'bg-yellow-200'}`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300
            ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
          >
            {isDarkMode ? (
              
              <MoonIcon className="w-4 h-4 text-blue-700" />
            ) : (
              <SunIcon className="w-4 h-4 text-yellow-700" />
            )}
          </div>
        </div>
      </label>
    </div>
  );
}

export default ThemeToggle;
