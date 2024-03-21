import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import authImg from "assets/img/auth/auth1.png";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials, setLoginError } from '../../slices/authSlice';
import Loader from "components/button/Loader";


export default function SignIn() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const loginError = useSelector(state => state.auth.loginError);
    const { userInfo } = useSelector((state) => state.auth);
    const handleForgotPasswordClick = () => {
      navigate('/auth/forgot-password');
    };
  useEffect(() => {
    if (userInfo) {
      navigate('/admin/default');
    }
  }, [navigate, userInfo]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    // Reset login error when the user starts typing again
    if (loginError) {
      dispatch(setLoginError(null));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/admin/default");
    } catch (err) {
      dispatch(setLoginError(err?.data?.message || 'An error occurred during login.'));
    }
  };

  return (
    
   <div className=" mt-60  grid lg:grid-cols-2  lg:gap-0 md:grid-cols-1 sm:grid-cols-1  " >
    <div className=" sm:rounded-lg ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full bg-lightblue "
    style={{ 
    borderRadius: '100px 0 0 0 '
}} >

<h4 className="mb-2.5 md:rounded-lg text-4xl font-bold text-navy-700 dark:text-white text-center">
          Sign In
        </h4>
        <p className="mb-9 text-center text-base text-gray-600">
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
      required
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="Enter your email"
        id="email"
        type="text"
        name="email"

            value={email}
            onChange={handleChange(setEmail)}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3
          }`}
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
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}

      />
      {/* Checkbox */}
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center">
        {/*  <Checkbox />
          <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
            Keep me logged In
    </p> */}
    {loginError && <div className="text-red-500">{loginError}</div>}
        </div>
        <a       onClick={handleForgotPasswordClick}
          className="text-sm  text-kindyblue font-medium text-brand-600 hover:text-kindyorange dark:text-white"
          href=" "
        >
          Forgot Password?
        </a>
      </div>
      
  {/* Your input fields here */}
  <button
      disabled={isLoading}
     type="submit"
     className="mt-2 w-full bg-kindyblue py-[12px] text-base font-medium text-white rounded-tl-3xl rounded-br-3xl hover:bg-transparent  hover:border-2 hover:text-blue-700 border-2 hover:border-white/0 border-white/0 hover:bg-kindyorange hover:text-white">
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
            className="ml-1  text-kindyblue  text-sm font-medium text-brand-600 hover:text-kindyorange  dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    <div
    className="bg-cover bg-center shadow-lg sm:w4/6 "    style={{ 
      backgroundImage: `url(${authImg})`,
      borderRadius: '0 0 100px 0'   , width: '85.71%' 
    }}
/>
    </div> 
  );
}
