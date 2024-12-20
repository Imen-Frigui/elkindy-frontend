import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { MdBarChart } from "react-icons/md";
import { FaUserGraduate,FaUserTie  } from "react-icons/fa";

import { columnsDataCheck } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";

import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import InstrumentDashboard from "./components/InstrumentDashboard";
import InstrumentTrends from "./components/InstrumentTrends";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchUserData} from "../../../slices/userSlice";
import Loader from "../../../components/button/Loader";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { userData, isLoading, error } = useSelector((state) => state.user);
    const [selectedClassId, setSelectedClassId] = useState(null);


    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error("Error fetching user data:", error);
        return <div>Error: {error}</div>;
    }

    const isTeacher = userData?.user?.role === 'teacher';
    const teacherId = userData?.user?._id;

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
          {isTeacher && (
        <div className="md:col-span-3">
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
          )}
        <div className="md:col-span-2">
          <TotalSpent />
        </div>
        <div>
          <WeeklyRevenue />
        </div>
      </div>
      <div className="mt-3 grid  grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 ">
          <InstrumentDashboard></InstrumentDashboard>
        <InstrumentTrends></InstrumentTrends>
      </div>
  </div>
  );
};

export default Dashboard;
