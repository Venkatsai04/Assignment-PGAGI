import React from 'react';
import { useSelector } from 'react-redux';

const categories = ['All', 'News', 'Recommendations', 'Updates', 'Promotions'];

const FilterBar = () => {

  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const FilterBarBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
  const FilterBarBgClassSpl = isDarkMode ? 'bg-[#0000007d]' : 'bg-white';
  const FilterBarTextClass = isDarkMode ? 'text-white' : 'text-black';
  // const FilterBarTextClassSpl = isDarkMode ? 'text-white' : 'text-black';

  return (
    <div className={`${FilterBarBgClass} flex items-center mt-[-1px]`}>
      <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap no-scrollbar">
        {categories.map((category) => (
          <div key={category} className={`flex h-8 shrink-0 items-center justify-center gap-x-2 ${FilterBarBgClassSpl} rounded-lg  pl-4 pr-4`}>
            <p className={`${FilterBarTextClass} text-sm font-medium leading-normal`}>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;