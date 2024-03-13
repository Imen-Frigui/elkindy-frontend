import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5"; 

const SuccessAlert = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); 
    }, 4000); 

    return () => clearTimeout(timer); 
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose(); // Callback to close the alert
  };

  return visible ? (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md z-50">
      <strong className="font-bold"></strong>
      <span className="block sm:inline">{message}</span>
      <button
        onClick={handleClose}
        className="absolute top-1 right-1"
      >
        <IoCloseSharp /> 
      </button>
    </div>
  ) : null;
};

export default SuccessAlert;
