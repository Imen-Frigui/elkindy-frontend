import Dashboard from "views/student/newview";
import React from "react";
import {
  MdHome, MdPerson,
} from "react-icons/md";
import ProfileOverview from "views/admin/profile";
const routes = [
   {
    name: "Dashboard Student",
    layout: "/student",
    path: "default",
    icon: <MdHome className="h-6 w-6" />, // Make sure to import MdHome in the actual component file
    component: <Dashboard />, // Render Dashboard component for student layout
  },
  {
    name: "ElKindy Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },  {
    name: "profile",
    layout: "/Teacher",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfileOverview />,
  },
 
  ]

    export default routes;