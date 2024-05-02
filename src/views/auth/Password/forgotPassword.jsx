import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
  
    const handleBackToSignIn = () => {
      navigate('/auth/sign-in'); // Update this path as per your routing setup
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            setMessage("");
            setError("");
            const res = await axios.post("http://localhost:3000/api/auth/forgot-Password", {email})
            console.log(res);
            setMessage(res.data.message);
            console.log(res.data.message);
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
            console.log(error.response.data.message);
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-lightblue">
         
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-8">
            <h1 className="text-xl font-bold text-center">Forgot Password</h1>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input 
                type="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <button 
                  className="mt-2 w-full bg-kindyblue py-[12px] text-base font-medium text-white rounded-tl-3xl rounded-br-3xl hover:bg-transparent  hover:border-2 hover:text-blue-700 border-2 hover:border-white/0 border-white/0 hover:bg-kindyorange hover:text-white">
                Send Reset Link
              </button>
              <button
        onClick={handleBackToSignIn}
        className="self-start px-4 py-2 mb-4  text-sm font-medium text-kindyblue transition-colors duration-200 transform rounded-md hover:bg-kindyblue hover:rounded-tr-2xl  hover:rounded-bl-2xl hover:text-white hover:border hover:border-kindyorange focus:outline-none focus:bg-kindyorange"
      >
        Back to Sign In
      </button>
            </form>
            
            {message && (
              <div className='bg-green-700 p-4 rounded-lg shadow text-white text-lg text-center'>
                <p>{message}</p>
              </div>
            )}
            
            {error && (
              <div className='bg-red-700 p-4 rounded-lg shadow text-white text-lg text-center'>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      );
      
}

export default ForgotPassword;