import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import { MdBook, MdEventNote } from "react-icons/md";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import { GiTicket } from "react-icons/gi";
import { FaUserTie, FaCalendarAlt, FaShoppingBasket } from "react-icons/fa";

// Auth Imports
import SignIn from "views/auth/SignIn";
import ExamsList from "views/exams/exam.jsx"
// Icon Imports
import CoursesList from "views/course/CoursesList";
import EventsList from "views/events/EventsList";
import TicketsList from "views/tickets/TicketsList";
import EventDetails from "views/events/components/EventDetails";
import { GiPapers } from "react-icons/gi";

import {
  MdHome,
  MdPerson,
  MdLock
} from "react-icons/md";

import AssignTeachers from "./views/course/AssignTeachers";

import Register from "views/auth/register";
import UnauthorizedPage from "views/auth/unauthorized";


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
 /* {
    name: "Tickets List",
    layout: "/admin",
    path: "tickets",
    icon: <GiTicket className="h-6 w-6" />,
    component: <TicketsList />,
  },*/

  {
    name: "Courses List",
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

  
    /*
  {
    layout: "/admin",
    path: "/assign-teachers/:courseId",
    component: <AssignTeachers />,
    hide: true,
  },*/

];

export default routes;

