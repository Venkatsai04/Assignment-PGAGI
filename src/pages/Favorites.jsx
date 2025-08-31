import React from 'react';
import { useSelector } from 'react-redux';
import ContentCard from '../reuseableComponents/ContentCard';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const customPageTextBaseClass = isDarkMode ? 'text-white' : 'text-black';

  if (favorites.length === 0) {
    return <h2 className={`${customPageTextBaseClass} text-center mt-10`}>No favorites added yet!</h2>;
  }

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {favorites.map((fav) => (
        <ContentCard key={fav.id} {...fav} />
      ))}
    </div>
  );
};

export default Favorites;
