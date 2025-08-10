import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const ContentCard = ({ imageUrl, title, description, source, hoursAgo, id, url }) => {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = favorites.some((fav) => fav.id === id);
  const [active, setActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
      setToastMessage('Removed from favourites!');
    } else {
      dispatch(addFavorite({ id, imageUrl, title, description, url }));
      setToastMessage('Added to favourites!');
    }
    setActive(true);
    setTimeout(() => setActive(false), 1000);
    setTimeout(() => setToastMessage(''), 1500);
  };

  const cardBgClass = isDarkMode ? 'bg-[#0000007d]' : 'bg-amber-50';
  const cardTextClass = isDarkMode ? 'text-white' : 'text-black';
  const cardTextClassSpl = isDarkMode ? 'text-[#b9b9b9]' : 'text-[#313131]';

  return (
    <div className={`${cardBgClass} flex flex-col items-stretch rounded-[8px] shadow-xl/20 relative`}>
      {/* Hours Ago */}
      <p
        className={`${cardTextClass} absolute text-sm font-bold m-1.5 ${cardBgClass} w-[105px] p-[5px] rounded-[6px]`}
      >
        {hoursAgo} Hours Ago
      </p>

      {/* Toast */}
      {toastMessage && (
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-yellow-200 text-black'} transition-opacity`}
        >
          {toastMessage}
        </span>
      )}

      {/* Image */}
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>

      {/* Content */}
      <div className="flex w-full flex-col gap-1 py-4">
        <p className={`${cardTextClass} text-lg font-bold pl-2`}>{title}</p>
        <p className={`${cardTextClassSpl} text-justify pl-2 pr-2`}>{description}</p>

        <div className="flex items-center justify-between px-2">
          <button className="text-white bg-blue-600 px-4 py-2 rounded-lg">
            <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
          </button>

          {/* SVG Star with Animation */}
          <div
            className={`cursor-pointer transition-transform duration-300 ${active ? 'scale-125' : 'scale-100'}`}
            onClick={handleFavoriteClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={'30px'}
              height={'30px'}
              viewBox="0 0 24 24"
              fill={isFavorite ? 'gold' : 'transparent'}
              stroke={isDarkMode ? 'white' : 'black'}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
