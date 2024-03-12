import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { FaUserGraduate,FaUserTie  } from "react-icons/fa";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}



      <div className="mt-3 grid  grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 ">
        <Widget
          icon={<FaUserGraduate className="h-7 w-7 text-kindydarkblue" />}
          title={"Students"}
          subtitle={"340"}
        />

        <Widget
          icon={<FaUserGraduate className="h-7 w-7 text-kindydarkblue" />}
          title={"Students"}

          subtitle={"$340.5"}
        />
      </div>
      <div className="mt-3 grid  grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 ">
        <Widget
          icon={<FaUserGraduate className="h-7 w-7 text-kindydarkblue" />}
          title={"Students"}
          subtitle={"340"}

        />
        <Widget
          icon={<FaUserTie className="h-6 w-6 text-kindydarkblue" />}
          title={"Staff"}
          subtitle={"35"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-kindydarkblue" />}
          title={"Instruments"}
          
          subtitle={"55"}

        />
        <div className="space-y-5 md:row-span-3 ">
          <MiniCalendar />
          <TaskCard />
        </div>
        <div className="md:col-span-3">
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
        <div className="md:col-span-2">
          <TotalSpent />
        </div>
        <div>
          <WeeklyRevenue />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
