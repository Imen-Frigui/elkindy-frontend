import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Footer from "components/footer/Footer";
import routes from "routes.js";

import EventDetails from "views/events/components/EventDetails";
import UpdateEvent from "views/events/components/UpdateEvent";
import AddEvent from "views/events/components/AddEvent";
import Sidebarr from "../../components/sidebarr";

import CoursesList from "../../views/course/CoursesList";
import AssignTeachers from "../../views/course/AssignTeachers";
import ArchivedEventsList from "../../views/events/components/ArchivedEventsList";

import SideBarr from "components/sidebarr";
import CreateInstrument from "views/admin/marketplace/components/CreateInstrument";
import InstrumentDetail from "views/admin/marketplace/components/InstrumentDetail";
import EventsList from "views/events/EventsList";
import ExamsList from "views/exams/exam";

import ClassConfigPage from "../../views/course/ClassConfigPage";




import useSocketStore from "../../ZustStore/socketStore";
import UserTrades from "views/admin/marketplace/components/UserTrades";
import InventoryList from "views/admin/marketplace/components/InventoryProducts";
import Conversations from "views/chat/Conversations";
import ExamClass from "../../views/teacherExam/examClass";
import Quiz from "components/ui/Quiz";
import QuizGame from "components/ui/QuizGame";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const { socket, initializeSocket } = useSocketStore();
  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  useEffect(() => {
    const connectSocket = async () => {
      await initializeSocket();
    };
    connectSocket();
  }, []);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <SideBarr open={open} onClose={() => setOpen(false)} />
      {/* <Sidebar open={open} onClose={() => setOpen(false)} /> */}
      {/* Navbar & Main Content */}
      <div className="h-full w-full  bg-indigo-50 dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[5px] h-full flex-none transition-all md:pr-2 xl:ml-[100px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              socket={socket}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route path="/courses" element={<CoursesList />} />
                <Route path="/courses/assign-teachers/:courseId" element={<AssignTeachers />} />
                <Route path="/courses/:courseId/class/:classId" element={<ClassConfigPage />} />


                <Route
                  path="/marketplace/create"
                  element={<CreateInstrument />}
                />
                <Route
                  path="/marketplace/instrument/:id"
                  element={<InstrumentDetail />}
                />
                <Route
                  path="/marketplace/inventory"
                  element={<InventoryList />}
                />
                
                <Route path="/chat" element={<Conversations />} />
                <Route path="/chat/quiz" element={<QuizGame />} />

                <Route
                  path="/marketplace/trades"
                  element={<UserTrades />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />

                <Route path="/courses" element={<CoursesList />} />
                <Route
                  path="/courses/assign-teachers/:courseId"
                  element={<AssignTeachers />}
                />

                <Route path="/events" element={<EventsList />} />
                <Route path="/events/details/:eventId" element={<EventDetails />} />
                <Route path="/events/edit/:eventId" element={<UpdateEvent />} />
                <Route path="/events/archived" element={<ArchivedEventsList />} />
                <Route path="/events/addevent" element={<AddEvent />} />

                <Route path={"/exams"} element={<ExamsList />} />
                <Route path={"teacher/examClass"} element={<ExamClass />} />


                <Route
                  path="/marketplace/create"
                  element={<CreateInstrument />}
                />
                <Route
                  path="/marketplace/instrument/:id"
                  element={<InstrumentDetail />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
