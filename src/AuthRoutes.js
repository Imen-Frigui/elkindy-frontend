import Dashboard from "views/student/newview";
import React from "react";
import {
  MdBook,
  MdHome, MdPerson,
} from "react-icons/md";
import ProfileOverview from "views/admin/profile";
import UnauthorizedPage from "views/auth/unauthorized";
import RegisterPage from "views/auth/register";
import StudentEnroll from "views/auth/StudentFormEnroll";
import SignIn from "views/auth/SignIn";

const routes = [
  {
    name: "registration",
        layout: "/auth",
    path: "sign-in",
    icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,
  
    component: <SignIn />,
    hide: true,
  
  },
  
{
  name: "registration",
      layout: "/auth",
  path: "Register",
  icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,

  component: <RegisterPage />,
  hide: true,

},
{
  name: "registration",
      layout: "/auth",
  path: "Register/:courseId",
  icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,

  component: <StudentEnroll />,
  hide: true,

},




{
  name: "unauthorized",
      layout: "/auth",
  path: "unauthorized",
  icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,

  hide: true,
  component: <UnauthorizedPage />,
},
 
  ]

    export default routes;