import React from 'react';
import { useSelector } from 'react-redux';

const categories = ['All', 'News', 'Technology', 'Sports', 'Finance', 'Tech'];

const FilterBar = ({ selectedCategory, onSelectCategory }) => {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const FilterBarBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
  const FilterBarBgClassSpl = isDarkMode ? 'bg-[#0000007d]' : 'bg-white';
  const FilterBarTextClass = isDarkMode ? 'text-white' : 'text-black';

  return (
    <div className={`${FilterBarBgClass} flex items-center mt-[-1px]`}>
      <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap no-scrollbar">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <div
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-colors duration-200
                ${isSelected
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-200 text-blue-800'
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
