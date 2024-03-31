import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "views/rtl/default/components/Widget";
import CheckTable from "views/rtl/default/components/CheckTable";
import ComplexTable from "views/rtl/default/components/ComplexTable";
import DailyTraffic from "views/rtl/default/components/DailyTraffic";
import TaskCard from "views/rtl/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import Header from "./components/Header";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

    <Header/>
    </div>
  );
};

export default Dashboard;
