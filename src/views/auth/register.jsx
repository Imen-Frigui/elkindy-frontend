import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import authImg from "assets/img/auth/auth1.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import useAuthStore from 'store/authStore'; // Ensure this path is correct

export default function Register() {



    const [errors, setErrors] = useState({
        courseName: '',
      
    });
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { ...errors };

    if (!inputValue.email) {
        formIsValid = true;
        newErrors["courseName"] = "Course name is required.";
        console.log(newErrors)
    }
   
    setErrors(newErrors);
    console.log(newErrors)
    return formIsValid;
  };



  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err) => toast.error(err, {
    position: "bottom-left",
  });

  const handleSuccess = (msg) => toast.success(msg, {
    position: "bottom-left",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const { email, password } = inputValue; // Destructure the email and password from the state
if(validateForm()){

    if (!email || !password) {
      handleError("Both email and password are required.");
      return ;
    }

    try {
      const response = await fetch("http://localhost:3030/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Use destructured values
      });

      const data = await response.json();
      console.log(data.token);
   //   localStorage.setItem('token', data.token);
      if (response.ok) {
        setToken(data.token);
        handleSuccess(data.message || "Login successful!");
        navigate("/admin/default");
      } else {
        handleError(data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      handleError(error.message || "An unexpected error occurred.");
    }
  }
  else{ console.log("Form is invalid")}

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
      <form onSubmit={handleSubmit} className="container w-full">  
      {/* Email */}
      <input
      
      className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 `}
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="Enter your email"
        id="email"
        type="text"
        name="email"
        value={inputValue.email}
        onChange={handleOnChange}
        

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
        value={inputValue.password}
        onChange={handleOnChange}

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
     type="submit"
    className="linear mt-2 w-full bg-blue-700 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-500 dark:active:bg-blue-300 rounded-tr-[25px] rounded-bl-[25px]"
  >
    Sign In
  </button>
</form>

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
