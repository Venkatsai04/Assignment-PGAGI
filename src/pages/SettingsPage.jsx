import React from 'react'
import { useSelector } from 'react-redux';




const SettingsPage = () => {

    const isDarkMode = useSelector((state) => state.preferences.darkMode);
    const settingsPageBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
    const settingsPageTextBaseClass = isDarkMode ? 'text-white' : 'text-black';
    const settingsPageTextInactiveClass = isDarkMode ? 'text-[#adadad]' : 'text-gray-600';

    return (
        <div
            className={`relative flex min-h-screen flex-col ${settingsPageBgClass} justify-between overflow-x-hidden`}
            style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
        >
            <div>
                {/* Header */}
                <div className={`flex items-center ${settingsPageBgClass} p-4 pb-2 justify-between`}>
                   
                    <h2 className={`${settingsPageTextBaseClass} text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12`}>
                        Settings
                    </h2>
                </div>

                {/* Section: Account */}
                <SectionTitle title="Account" />
                <SettingItem
                    icon="User"
                    title="Profile"
                    description="Manage your profile information"
                />
                <SettingItem
                    icon="Star"
                    title="Subscription"
                    description="Manage your subscription"
                />
                <SettingItem
                    icon="CreditCard"
                    title="Payment Methods"
                    description="Manage your payment methods"
                />

                {/* Section: App Preferences */}
                <SectionTitle title="App Preferences" />
                <SettingItem
                    icon="Bell"
                    title="Notifications"
                    description="Customize your notification settings"
                />
                <SettingItem
                    icon="Sun"
                    title="Display"
                    description="Adjust display settings"
                />
                <SettingItem
                    icon="Shield"
                    title="Privacy"
                    description="Manage your privacy settings"
                />

                {/* Section: Help & Support */}
                <SectionTitle title="Help & Support" />
                <SettingItem
                    icon="Question"
                    title="Help Center"
                    description="Get help and support"
                />
                <SettingItem
                    icon="Envelope"
                    title="Contact Us"
                    description="Contact us for assistance"
                />
                <SettingItem
                    icon="Info"
                    title="About"
                    description="Learn about the app"
                />
            </div>
        </div>
    );
};

const SectionTitle = ({ title }) => {

    const isDarkMode = useSelector((state) => state.preferences.darkMode);
    const settingsPageBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
    const settingsPageTextBaseClass = isDarkMode ? 'text-white' : 'text-black';
    const settingsPageTextInactiveClass = isDarkMode ? 'text-[#adadad]' : 'text-gray-600';

    return(

    <h3 className={`${settingsPageTextBaseClass} text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4`}>
        {title}
    </h3>
)};

const SettingItem = ({ icon, title, description }) => {
    const isDarkMode = useSelector((state) => state.preferences.darkMode);
    const settingsPageBgClass = isDarkMode ? 'bg-[#090030]' : 'bg-amber-50';
    const settingsPageTextBaseClass = isDarkMode ? 'text-white' : 'text-black';
    const settingsPageTextInactiveClass = isDarkMode ? 'text-[#adadad]' : 'text-gray-600';

    const icons = {
        User: (
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
        ),
        Star: (
            <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Z" />
        ),
        CreditCard: (
            <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
        ),
        Bell: (
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
        ),
        Sun: (
            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128Z" />
        ),
        Shield: (
            <path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56l160,0Z" />
        ),
        Question: (
            <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Z" />
        ),
        Envelope: (
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
        ),
        Info: (
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm16,152a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
        ),
    };

    return (
        <div className={`flex items-center gap-4 ${settingsPageBgClass} px-4 min-h-[72px] py-2`}>
            <div className={`${settingsPageTextBaseClass} flex items-center justify-center rounded-lg ${settingsPageBgClass} shrink-0 size-12`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    {icons[icon]}
                </svg>
            </div>
            <div className="flex flex-col justify-center">
                <p className={`${settingsPageTextBaseClass} text-base font-medium leading-normal line-clamp-1`}>
                    {title}
                </p>
                <p className={`${settingsPageTextInactiveClass} text-sm font-normal leading-normal line-clamp-2`}>
                    {description}
                </p>
            </div>
        </div>
    );

}

export default SettingsPage