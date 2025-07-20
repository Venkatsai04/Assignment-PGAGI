// src/components/ThemeToggle.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../redux/store.js';

function ThemeToggle() {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <span className="text-gray-900 dark:text-gray-100">Light Mode</span>
      <label className="switch relative inline-block w-12 h-6">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`slider absolute cursor-pointer top-0 left-0 right-0 bottom-0
                     rounded-full transition-colors duration-300
                     ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <span
            className={`dot absolute h-5 w-5 left-0.5 bottom-0.5 bg-white
                       rounded-full transition-transform duration-300
                       ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
          ></span>
        </span>
      </label>
      <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
    </div>
  );
}

export default ThemeToggle;