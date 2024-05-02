    // Button.jsx
import React from 'react';

function Button({ onClick, children }) {
    return (
        <button
            className=" bg-kindyorange  hover:bluebg text-white font-bold py-2 px-4 rounded-tr-xl rounded-bl-xl"
            onClick={onClick}
        >
            {children
            }
        </button>
    );
}

export default Button;
