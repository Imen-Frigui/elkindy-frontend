import React from 'react';
import { FaStar } from 'react-icons/fa';

const Greeting = ({ username }) => {
    return (
        <div className="absolute top-[125px] left-[140px] w-[415px] h-[137px] flex flex-col items-start p-0 gap-[10px] bg-[#F7F5EF]">
            <h1 className="text-5xl font-bold text-gray-800">
                Good Morning
            </h1>
            <div className="flex items-center">
                <h2 className="text-3xl font-bold text-gray-800">
                    Mr. {username}
                </h2>
                <FaStar className="text-yellow-400 ml-2"/>
            </div>
        </div>
    );
};

export default Greeting;
