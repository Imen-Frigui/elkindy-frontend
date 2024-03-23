import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import authImg from "assets/img/auth/auth1.png";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials, setLoginError } from "../../slices/authSlice";
import Loader from "components/button/Loader";
import { FaGuitar, FaPiano, FaViolin } from "react-icons/fa";

export default function SignIn() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const loginError = useSelector((state) => state.auth.loginError);
  const { userInfo } = useSelector((state) => state.auth);
  const handleForgotPasswordClick = () => {
    navigate("/auth/forgot-password");
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/admin/default");
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
      dispatch(
        setLoginError(err?.data?.message || "An error occurred during login.")
      );
    }
  };

  return (
    <div className=" mt-60  grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 lg:gap-0  ">
      <div
        className=" ml-20 w-full max-w-xl bg-lightblue p-8 shadow-lg dark:bg-gray-800 sm:rounded-lg "
        style={{
          borderRadius: "100px 0 0 0 ",
        }}
      >
        <h4 className="mb-2.5 text-center text-4xl font-bold text-navy-700 dark:text-white md:rounded-lg">
          Sign In
        </h4>
        <p className="mb-9 text-center text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary shadow-lg hover:cursor-pointer dark:bg-navy-800">
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
            className={`} mb-3 mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm
          outline-none`}
          />

          {/* Password */}
          <input
            className={`} mb-3 mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm
      outline-none`}
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
            <a
              onClick={handleForgotPasswordClick}
              className="text-sm  font-medium text-brand-600 text-kindyblue hover:text-kindyorange dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>

          {/* Your input fields here */}
          <button
            disabled={isLoading}
            type="submit"
            className="hover:bg-transparent mt-2 w-full rounded-br-3xl rounded-tl-3xl border-2 border-white/0 bg-kindyblue py-[12px] text-base  font-medium text-white hover:border-2 hover:border-white/0 hover:bg-kindyorange hover:text-blue-700 hover:text-white"
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
            className="ml-1  text-sm  font-medium text-brand-600 text-kindyblue hover:text-kindyorange  dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
      <div
        className="sm:w4/6 bg-cover bg-center shadow-lg "
        style={{
          backgroundImage: `url(${authImg})`,
          borderRadius: "0 0 100px 0",
          width: "85.71%",
        }}
      />
    </div>
  );
}
