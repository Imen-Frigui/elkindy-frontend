import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import authImg from "assets/img/auth/auth.jpg";

export default function SignIn() {
  return (
   <div className="grid lg:grid-cols-2 lg:gap-0 md:grid-cols-1 sm:grid-cols-1" >

    <div className="bg-white ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full" style={{ 
    borderRadius: '30px 0% 0%'
}} >

      <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
        Sign In
      </h4>
      <p className="mb-9 ml-1 text-base text-gray-600">
        Enter your email and password to sign in!
      </p>
      <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
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
        placeholder="mail@simmmple.com"
        id="email"
        type="text"
      />

      {/* Password */}
      <InputField
        variant="auth"
        extra="mb-3"
        label="Password*"
        placeholder="Min. 8 characters"
        id="password"
        type="password"
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
          className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          href=" "
        >
          Forgot Password?
        </a>
      </div>
      <button
  className="linear mt-2 w-full rounded-tr-lg rounded-bl-lg bg-blue-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-500 dark:active:bg-blue-300"
>
  Sign In
</button>
      <div className="mt-4">
        <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
          Not registered yet?
        </span>
        <a
          href=" "
          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        >
          Create an account
        </a>
      </div>
    </div>
    <div
    class="h-full items-end bg-cover bg-center shadow-lg"
    style={{ 
        backgroundImage: `url(${authImg})`    }}
/>
    </div> 
  );
}
