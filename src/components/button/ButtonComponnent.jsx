import React from 'react';

const ButtonComponent = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-[#F98100] text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F98100]"
            style={{ borderRadius: '30px 0px' }}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;
