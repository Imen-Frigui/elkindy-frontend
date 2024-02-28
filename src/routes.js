import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import { MdBook } from "react-icons/md";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import RegistrationList from "views/registration/RegistrationList";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import CoursesList from "views/course/CoursesList";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
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
    name: "Courses List",
    layout: "/admin",
    path: "courses",
    icon: <MdBook className="h-6 w-6" />,
    component: <CoursesList />,
  },

  {
    name: "Users List",
    layout: "/admin",
    path: "users",
    icon: <MdBook className="h-6 w-6" />,
    component: <RegistrationList />,
  },
];
export default routes;
