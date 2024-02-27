import React from 'react';

const ButtonComponent = ({ text, onClick, color }) => {
    return (
        <button
            onClick={onClick}
            className="text-white hover:bg-orange-600 p-2"
            style={{ backgroundColor: color, borderRadius: '22px 0px' }}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;
