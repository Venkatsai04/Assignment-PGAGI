import React from 'react'
import { useSelector } from 'react-redux';

const SourcePage = () => {

    const isDarkMode = useSelector((state) => state.preferences.darkMode);

    const SourcePageBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
    const SourcePageTextBaseClass = isDarkMode ? 'text-white' : 'text-black';
    const SourcePageTextInactiveClass = isDarkMode ? 'text-[#adadad]' : 'text-gray-600';

    const yourSources = [
        {
            title: "Tech News",
            subtitle: "TechCrunch",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ftPX-R197_99oeyuuN6LHJHauSF40jMDU5La4v2jJ6cVRa_OahQ7aG-ejONrk99C2GJb2470rR5NdBumBKk1nlRFw2wKZMMzn4rsnk3aYATi5XdXU9vITCAA7fEQiwOSQCdD29cipRMhSEUTID8i3NURl-2VuOdLF6nlrA7L0h1oinZrNNV8SWpBNw0NDs74FsyDkI_eS0X28Q57Iq8u-ZiUabUhDccZdTgBEov9MZWbqtQqC32oy0PZAjs7CXQKA3vGY0EkKehL",
        },
        {
            title: "Tech News",
            subtitle: "TechCrunch",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ftPX-R197_99oeyuuN6LHJHauSF40jMDU5La4v2jJ6cVRa_OahQ7aG-ejONrk99C2GJb2470rR5NdBumBKk1nlRFw2wKZMMzn4rsnk3aYATi5XdXU9vITCAA7fEQiwOSQCdD29cipRMhSEUTID8i3NURl-2VuOdLF6nlrA7L0h1oinZrNNV8SWpBNw0NDs74FsyDkI_eS0X28Q57Iq8u-ZiUabUhDccZdTgBEov9MZWbqtQqC32oy0PZAjs7CXQKA3vGY0EkKehL",
        },
        // ... Add other sources here as objects
    ];
    const avaliabvleSources = [
        {
            title: "Tech News",
            subtitle: "TechCrunch",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ftPX-R197_99oeyuuN6LHJHauSF40jMDU5La4v2jJ6cVRa_OahQ7aG-ejONrk99C2GJb2470rR5NdBumBKk1nlRFw2wKZMMzn4rsnk3aYATi5XdXU9vITCAA7fEQiwOSQCdD29cipRMhSEUTID8i3NURl-2VuOdLF6nlrA7L0h1oinZrNNV8SWpBNw0NDs74FsyDkI_eS0X28Q57Iq8u-ZiUabUhDccZdTgBEov9MZWbqtQqC32oy0PZAjs7CXQKA3vGY0EkKehL",
        },
        // ... Add other sources here as objects
    ];

    return (
        <div
            className={`relative flex min-h-screen flex-col ${SourcePageBgClass} justify-between overflow-x-hidden`}
            style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
        >
            <div>
               
                <h2 class={`${SourcePageTextBaseClass} text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12`}>Sources</h2>

                <div>
                    <h3 className={`${SourcePageTextBaseClass} text-lg font-bold px-4 pb-2 pt-4`}>
                        Your Sources
                    </h3>
                    <div>
                        {yourSources.map((source, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 ${SourcePageBgClass} px-4 min-h-[72px] py-2`}
                            >
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                                    style={{ backgroundImage: `url(${source.image})` }}
                                ></div>
                                <div className="flex flex-col justify-center">
                                    <p className={`${SourcePageTextBaseClass} text-base font-medium line-clamp-1`}>
                                        {source.title}
                                    </p>
                                    <p className={`${SourcePageTextInactiveClass} text-sm font-normal line-clamp-2`}>
                                        {source.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className={`${SourcePageTextBaseClass} text-lg font-bold px-4 pb-2 pt-4`}>
                        Avaliabvle Sources
                    </h3>
                    <div>
                        {avaliabvleSources.map((source, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 ${SourcePageBgClass} px-4 min-h-[72px] py-2`}
                            >
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                                    style={{ backgroundImage: `url(${source.image})` }}
                                ></div>
                                <div className="flex flex-col justify-center">
                                    <p className={`${SourcePageTextBaseClass} text-base font-medium line-clamp-1`}>
                                        {source.title}
                                    </p>
                                    <p className={`${SourcePageTextInactiveClass} text-sm font-normal line-clamp-2`}>
                                        {source.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SourcePage