import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import FilterBar from './FilterBar';
import ContentPage from './ContentPage';


const ContentCard = ({ imageUrl, title, description, readTime, hoursAgo, id }) => {

  const isActive = (path) => location.pathname === path;

  const isDarkMode = useSelector((state) => state.preferences.darkMode);
  const cardBgClass = isDarkMode ? 'bg-[#0000007d]' : 'bg-amber-50';
  const cardBgClassSpl = isDarkMode ? 'bg-[#090030]' : 'bg-white';
  const cardTextClass = isDarkMode ? 'text-white' : 'text-black';
  const cardTextClassSpl = isDarkMode ? 'text-[#b9b9b9]' : 'text-[#313131]';

  const [selectedId, setSelectedId] = useState(null);



  return (
    <>
      <div >
        <div onClick={() => openContentPage(id)} className={`${cardBgClass} flex flex-col items-stretch justify-start rounded-[8px] @xl:flex-row @xl:items-start shadow-xl/20`} >
          <p className={`${cardTextClass} absolute text-sm font-bold leading-tight tracking-[-0.015em] m-1.5 ${cardBgClass} w-[95px] p-[5px] rounded-[6px]`}>{hoursAgo} Hours Ago</p>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          ></div>
          <div className={` flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4 `}>
            <p className={`${cardTextClass} text-lg font-bold leading-tight tracking-[-0.015em] pl-2`}>{title}</p>
            <div className="flex items-end gap-3 justify-between text-black">
              <div className="flex flex-col gap-1 text-[90%]]">
                <p className={`${cardTextClassSpl} text-justify font-normal leading-normal pl-2 pr-2`}>{description}</p>
                <p className={`${cardTextClassSpl} text-justify font-normal leading-normal pl-2 pr-2`}>{readTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ContentCard;