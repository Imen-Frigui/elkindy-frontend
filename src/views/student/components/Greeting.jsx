import React from 'react';
import { FaStar } from 'react-icons/fa';

const Greeting = ({ username, gender}) => {
    const title = gender === 'female' ? 'Ms.' : 'Mr.';
    return (
        <div className=" top-0 left-0 md:top-[125px] md:left-[140px] w-full md:w-[415px] h-auto py-4 px-6 md:h-[137px] flex flex-col items-start gap-2 md:gap-[10px] bg-[#F7F5EF] dark:bg-navy-900">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white">
                Good Morning
            </h1>
            <div className="flex items-center">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    {title} {username}
                </h2>
                <FaStar className="text-yellow-400 ml-2 text-xl md:text-2xl"/>
            </div>
        </div>
    );
};

export default Greeting;
