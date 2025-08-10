import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ContentCard = ({ imageUrl, title, description, source, hoursAgo, id, url }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const cardBgClass = isDarkMode ? 'bg-[#0000007d]' : 'bg-amber-50';
  const cardBgClassSpl = isDarkMode ? 'bg-[#090030]' : 'bg-white';
  const cardTextClass = isDarkMode ? 'text-white' : 'text-black';
  const cardTextClassSpl = isDarkMode ? 'text-[#b9b9b9]' : 'text-[#313131]';


  const [selectedId, setSelectedId] = useState(null);


  return (
    <div>
      <div
        className={`${cardBgClass} flex flex-col items-stretch justify-start rounded-[8px] @xl:flex-row @xl:items-start shadow-xl/20 cursor-pointer`}
      >
        <p className={`${cardTextClass} absolute text-sm font-bold leading-tight tracking-[-0.015em] m-1.5 ${cardBgClass} w-[105px] p-[5px] rounded-[6px]`}>
          {hoursAgo} Hours Ago
        </p>
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p className={`${cardTextClass} text-lg font-bold leading-tight tracking-[-0.015em] pl-2`}>
            {title}
          </p>
          <div className="flex items-end gap-3 justify-between text-black">
            <div className="flex flex-col gap-1 text-[90%]">
              <p className={`${cardTextClassSpl} text-justify font-normal leading-normal pl-2 pr-2`}>
                {description}
              </p>
              <div className='flex flex-row items-center justify-between'>

                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer ml-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </button>

                <div className='cursor-pointer'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={'30px'}
                    height={'30px'}
                    viewBox="0 0 24 24"
                    fill={'transparent'}
                    stroke="white"
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
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
