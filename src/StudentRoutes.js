import Dashboard from "views/student/newview";
import React from "react";
import { MdHome, MdPerson } from "react-icons/md";
import ProfileOverview from "views/admin/profile";
import NFTMarketplace from "views/admin/marketplace";
import { FaCalendarAlt, FaShoppingBasket } from "react-icons/fa";

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
  },

  {
    name: "profile",
    layout: "/student",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfileOverview />,
  },

  {
    name: "ElKindy Marketplace",
    layout: "/student",
    path: "marketplace",
    icon: <FaShoppingBasket className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },

];

export default routes;
