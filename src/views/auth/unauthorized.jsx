import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for routing
import { logout } from 'slices/authSlice';

const UnauthorizedPage = () => {
 const  dispatch = useDispatch();
 const navigate = useNavigate();
  const redirectToSignIn = () => {
    navigate('/auth/sign-in');
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-6xl text-red-500 font-bold text-center mb-6">403</h1>
        <p className="text-lg text-gray-700 text-center mb-6">Unauthorized Access</p>
        <p className="text-base text-gray-600 text-center mb-6">You need to be an administrator  to access this page.</p>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={redirectToSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;