import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import { MdBook, MdEventNote } from "react-icons/md";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import {  FaCalendarAlt, FaShoppingBasket } from "react-icons/fa";

// Auth Imports
import EventsList from "views/events/EventsList";

import SignIn from "views/auth/SignIn";
import ExamsList from "views/exams/exam.jsx"
import EvaluationList from "views/teacherExam/evaluation.jsx"
// Icon Imports
import CoursesList from "views/course/CoursesList";

import { GiPapers } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import {
    MdHome,
    MdPerson,
    MdOutlineNoteAlt,
    MdSchedule
} from "react-icons/md";
import AssignTeachers from "./views/course/AssignTeachers";
import Register from "views/auth/register";
import UnauthorizedPage from "views/auth/unauthorized";
import UserList from "views/users/usersList";
import TeacherDashboard from "./views/teacher/TeacherDashboard";
import TeacherSchedule from "./views/teacher/TeacherSchedule";
import CourseDetails from "./views/rtl/default/components/front/CourseDetails";
import Dashboard from "views/rtl/default";


const routes = [


  {
    name: "ElKindy Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "ElKindy Marketplace",
    layout: "/admin",
    path: "marketplace",
    icon: <FaShoppingBasket className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "ElKindy Users",
    layout: "/admin",
    icon: <FaCalendarAlt className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
 
  
 /* {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },*/
  {
    name: "Events List",
    layout: "/admin",
    path: "events",
    icon: <MdEventNote className="h-6 w-6" />,
    component: <EventsList />,
  },
  {
    name: "Users List",
    layout: "/admin",
    path: "users",
    icon: <FaUsers className="h-6 w-6" />,
    component: <UserList />,
  },

    {
        name: "Courses",
        layout: "/admin",
        path: "courses",
        icon: <MdBook className="h-6 w-6" />,
        component: <CoursesList />,
    },


    {
        name: "All Exams",
        layout: "/admin",
        path: "exams",
        icon: <GiPapers className="h-6 w-6" />,
        component: <ExamsList />,
    },

    {

        name: "All Evaluations",
        layout: "/rtl",
        path: "evaluation",
        icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,
        hide: true,
      
        component: <EvaluationList />,
      },

        //name: "Teacher Dashboard",
        layout: "/admin",
        path: "teacher",
        icon: <MdOutlineNoteAlt  className="h-6 w-6" />,
        component: <TeacherDashboard />,
    },
    {
        //name: "Teacher Dashboard",
        layout: "/admin",
        path: "Schedule",
        icon: <MdSchedule  className="h-6 w-6" />,
        component: <TeacherSchedule />,
    },


{
    name: "Sign In",
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

    component: <Register />,
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

    {
        name: "RTL Admin",
        layout: "/rtl",
        path: "rtl",
        icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,
        hide: true,

        component: <RTLDefault />,
    },
    {
        name: "RTL Admin",
        layout: "/rtl",
        path: "/",
        icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,
        hide: true,

        component: <Dashboard />,
    },
    {
        name: "RTL Admin",
        layout: "/rtl",
        path: "course/:courseId",
        icon: <MdBook className="h-6 w-6" style={{ color: 'blue', display: 'none' }} />,
        hide: true,

        component: <CourseDetails />,
    },



];


export default routes;