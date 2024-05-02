import Dashboard from "views/student/newview";
import React from "react";
import { MdHome, MdPerson } from "react-icons/md";
import ProfileOverview from "views/admin/profile";
import NFTMarketplace from "views/admin/marketplace";
import { FaCalendarAlt, FaShoppingBasket, FaBook, FaFacebookMessenger } from "react-icons/fa";
import StudentDashboard from "./views/student/StudentDashboard";
import Conversation from "components/ui/Conversations";
import {GiPapers} from "react-icons/gi";
import ExamsList from "./views/exams/exam";
import StudentExams from "./views/studentExam/studentGrade";
import Conversations from "views/chat/Conversations";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

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
  {
    name: "ElKindy Chat",
    layout: "/student",
    path: "chat",
    icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
    component: <Conversations />,
  },

  {
    name: "ElKindy Courses",
    layout: "/student",
    path: "class",
    icon: <FaBook className="h-6 w-6" />,
    component: <StudentDashboard />,
    secondary: true,
  },
  {
    name: "All Exams",
    layout: "/student",
    path: "exams",
    icon: <GiPapers className="h-6 w-6" />,
    component: <StudentExams />,
  },

];

export default routes;
