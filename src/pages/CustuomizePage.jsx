import React from 'react'
import { useSelector } from 'react-redux';

const CustuomizePage = () => {

    const isDarkMode = useSelector((state) => state.preferences.darkMode);

    const customPageBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
    const customPageTextBaseClass = isDarkMode ? 'text-white' : 'text-black';
    const customPageTextInactiveClass = isDarkMode ? 'text-[#adadad]' : 'text-gray-600';


    const categories = [
        {
            title: "Technology",
            description: "Tech news, gadgets, software",
        },
        {
            title: "Sports",
            description: "Game highlights, player stats",
        },
        {
            title: "Finance",
            description: "Market trends, investment tips",
        },
        {
            title: "Health & Wellness",
            description: "Health tips, fitness routines",
        },
        {
            title: "Travel",
            description: "Travel guides, destination reviews",
        },
    ];

    const ToggleSwitch = () => (
        <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#363636] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-black">
            <div
                className="h-full w-[27px] rounded-full bg-white"
                style={{
                    boxShadow:
                        "rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px",
                }}
            ></div>
            <input type="checkbox" className="invisible absolute" />
        </label>
    );

    return (
        <div
            className={`relative flex size-full min-h-screen flex-col ${customPageBgClass} dark justify-between group/design-root overflow-x-hidden`}
            style={{
                fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
            }}
        >
            <div>
                <div className={`flex items-center ${customPageBgClass} p-4 pb-2 justify-between`}>
                    <h2 className={`${customPageTextBaseClass} text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12`}>
                        Customize
                    </h2>
                </div>

                <h3 className={`${customPageTextBaseClass} text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4`}>
                    Categories
                </h3>
                {categories.map((category) => (
                    <div
                        key={category.title}
                        className={`flex items-center gap-4 ${customPageBgClass} px-4 min-h-[72px] py-2 justify-between`}
                    >
                        <div className="flex flex-col justify-center">
                            <p className={`${customPageTextBaseClass} text-base font-medium leading-normal line-clamp-1`}>
                                {category.title}
                            </p>
                            <p className={`${customPageTextInactiveClass} text-sm font-normal leading-normal line-clamp-2`}>
                                {category.description}
                            </p>
                        </div>
                        <div className="shrink-0">
                            <ToggleSwitch />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustuomizePage