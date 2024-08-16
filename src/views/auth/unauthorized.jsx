import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for routing
import { logout } from 'slices/authSlice';
import kindylogo from '../../assets/img/auth/kindylogo.png'; // Update the path to your logo

const UnauthorizedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle redirection to the sign-in page and logout
  const redirectToSignIn = () => {
    dispatch(logout()); // Logout user
    navigate('/auth/sign-in'); // Redirect to sign-in page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Logo */}
      <img src={kindylogo} alt="Conservatory Logo" className="h-24 mb-6" />

      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        {/* Title */}
        <h1 className="text-6xl text-red-500 font-bold text-center mb-6">403</h1>

        {/* Message */}
        <p className="text-lg text-gray-700 text-center mb-6">Unauthorized Access</p>

        {/* Sign In Button */}
        <div className="flex justify-center">
          <button
  className="bg-kindyblue hover:bg-blue-500  rounded-tl-[15px] rounded-br-[15px] text-white font-bold py-2 px-4 "     
         onClick={redirectToSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
