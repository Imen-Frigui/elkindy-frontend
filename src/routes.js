import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import { MdBook ,MdEventNote} from "react-icons/md";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import { GiTicket } from "react-icons/gi";
import { FaUserTie, FaCalendarAlt, FaShoppingBasket } from "react-icons/fa";

// Auth Imports
import SignIn from "views/auth/SignIn";
import CoursesList from "views/course/CoursesList";

import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdBook,
} from "react-icons/md";

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
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
  {
    name: "Events List",
    layout: "/admin",
    path: "events",
    icon: <MdEventNote className="h-6 w-6" />,
  },
  {
    name: "Tickets List",
    layout: "/admin",
    path: "tickets",
    icon: <GiTicket className="h-6 w-6" />,
  },

  {
    name: "Courses List",
    layout: "/admin",
    path: "courses",
    icon: <MdBook className="h-6 w-6" />,
    component: <CoursesList />,
  },

    /*
  {
    layout: "/admin",
    path: "/assign-teachers/:courseId",
    component: <AssignTeachers />,
    hide: true,
  },*/

]
export default routes;
