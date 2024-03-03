import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import authImg from "assets/img/auth/auth1.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleError = (err) =>
  toast.error(err, {
    position: "bottom-left",
  });
const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "bottom-left",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          ...inputValue,
        },
              );

      const { success, message, token } = data;

      if (success) {
        // Handle successful login
        localStorage.setItem("token", token);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/admin/default");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
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
      {/* Email */}
      <InputField
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="Enter your email"
        id="email"
        type="text"
        name="email"
        value={inputValue.email}
        onChange={handleOnChange}
        required

      />

      {/* Password */}
      <InputField
        variant="auth"
        extra="mb-3"
        label="Password*"
        placeholder="Enter Your password"
        id="password"
        type="password"
        name="password"
        value={inputValue.password}
        onChange={handleOnChange}
        required

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
      <button
  type="submit"
  className="linear mt-2 w-full bg-blue-700 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-500 dark:active:bg-blue-300 rounded-tr-[25px] rounded-bl-[25px]"
>
  Sign In
</button>

<div className="mt-4 flex justify-center">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet ?
          </span>
          <a
            href=" "
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
