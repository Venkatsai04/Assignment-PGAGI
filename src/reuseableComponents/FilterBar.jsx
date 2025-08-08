import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const categories = ['All', 'News', 'technology', 'Sports', 'finance', 'Tech'];

const FilterBar = () => {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const FilterBarBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
  const FilterBarBgClassSpl = isDarkMode ? 'bg-[#0000007d]' : 'bg-white';
  const FilterBarTextClass = isDarkMode ? 'text-white' : 'text-black';

  const SelectCategory = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <div className={`${FilterBarBgClass} flex items-center mt-[-1px]`}>
      <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap no-scrollbar">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <div
              key={category}
              onClick={() => SelectCategory(category)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-colors duration-200
                ${isSelected
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-black'
                  : `${FilterBarBgClassSpl} ${FilterBarTextClass}`
                }`}
            >
              <p className="text-sm font-medium leading-normal">{category}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
