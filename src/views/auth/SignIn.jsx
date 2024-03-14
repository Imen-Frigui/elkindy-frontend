import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import authImg from "assets/img/auth/auth1.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import Loader from "components/button/Loader";
export default function SignIn() {

 // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/admin/default');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
   <div className="grid lg:grid-cols-2 lg:gap-0 md:grid-cols-1 sm:grid-cols-1 " >
    <div className="bg-customBackground ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full "
    style={{ 
    borderRadius: '30px 0 0 30px'
}} >

<h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">
          Sign In
        </h4>
        <p className="mb-9 text-base text-gray-600 text-center">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 shadow-lg">
  <div className="rounded-full text-xl">
    <FcGoogle />
  </div>
  <h5 className="text-sm font-medium text-navy-700 dark:text-white">
    Sign In with Google
  </h5>
</div>
      <div className="mb-6 flex items-center  gap-3">
        <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        <p className="text-base text-gray-600 dark:text-white"> or </p>
        <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
      </div>
      <form onSubmit={submitHandler} className="container w-full">  
      {/* Email */}
      <input
      
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="Enter your email"
        id="email"
        type="text"
        name="email"
 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}

      /> 


      {/* Password */}
      <input
      className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3
      }`}
        variant="auth"
        extra="mb-3"
        label="Password*"
        placeholder="Enter Your password"
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}

      />
      {/* Checkbox */}
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center">
          <Checkbox />
          <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
            Keep me logged In
          </p>
        </div>
        <a
          className="text-sm font-medium text-brand-600 hover:text-brand-600 dark:text-white"
          href=" "
        >
          Forgot Password?
        </a>
      </div>
  
  {/* Your input fields here */}
  <button
      disabled={isLoading}
     type="submit"
    className="linear mt-2 w-full bg-blue-700 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-500 dark:active:bg-blue-300 rounded-tr-[25px] rounded-bl-[25px]"
  >
    Sign In
  </button>
</form>
{isLoading && <Loader />}

<div className="mt-4 flex justify-center">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet ?
          </span>
          <a
            href="/auth/register"
            className="ml-1 text-sm font-medium text-brand-600 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    <div
    class="h-full items-end bg-cover bg-center shadow-lg"
    style={{ 
      backgroundImage: `url(${authImg})`,
      borderRadius: '0 30px 30px 0'  
    }}
/>
    </div> 
  );
}
