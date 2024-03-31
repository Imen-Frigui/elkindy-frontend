import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import authImg from "assets/img/auth/register2.jpg";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false)
const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setMessage("");
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false)
        } else {
            try {
                const token = searchParams.get("token");
                const res = await axios.post("http://localhost:3000/api/auth/reset-Password", {token, password })
                setMessage(res.data.message);
                Navigate("/auth/sign-in")
            } catch (error) {
                setError(error.response.data.message)
            }finally{
                setIsLoading(false)
            }
           
        }
       
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-8'>
            <h1 className='text-xl font-bold text-center p-5'>Reset Password</h1>
            
            { /* If you want to include an image, uncomment and use the following line */ }
            {/* <img className="mx-auto h-12 w-auto" src="path_to_your_image" alt="Your Brand" /> */}
            <div
        className="bg-cover bg-center shadow-lg "    style={{ 
          backgroundImage: `url(${authImg})`,
          borderRadius: '0 0 100px 0'   , width: '85.71%' 
        }}
    />
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input type="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                autoComplete='off'
              />
              <input type="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                autoComplete='off'
              />
              <button      className="mt-2 w-full bg-kindyblue py-[12px] text-base font-medium text-white rounded-tl-3xl rounded-br-3xl hover:bg-transparent  hover:border-2 hover:text-blue-700 border-2 hover:border-white/0 border-white/0 hover:bg-kindyorange hover:text-white">

                Reset
              </button>
            </form>
            {
              message && <div className='bg-green-700 p-4 rounded-lg shadow text-white text-lg text-center'>
                <p>{message}</p>
              </div>
            }
            {
              error && <div className='bg-red-700 p-4 rounded-tr-3xl rounded-bl-3xl  shadow text-white text-lg text-center'>
                <p>{error}</p>
              </div>
            }
          </div>
        </div>
      );
}

export default ResetPassword;