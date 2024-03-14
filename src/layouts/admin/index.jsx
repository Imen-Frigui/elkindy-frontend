import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";

import EventDetails from "views/events/components/EventDetails";
import UpdateEvent from "views/events/components/UpdateEvent";
import Sidebarr from "../../components/sidebarr";
import CoursesList from "../../views/course/CoursesList";
import AssignTeachers from "../../views/course/AssignTeachers";


import SideBarr from "components/sidebarr";
import CreateInstrument from "views/admin/marketplace/components/CreateInstrument";
import InstrumentDetail from "views/admin/marketplace/components/InstrumentDetail";
import { io } from "socket.io-client";
import EventsList from "views/events/EventsList";
import ExamsList from "views/exams/exam";



export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [socket, setSocket] = useState(null);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    console.log(socket);
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

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
      <div className="h-full w-full bg-kindygray dark:!bg-navy-900">
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

                <Route path="/courses" element={<CoursesList />}/>
                <Route path="/courses/assign-teachers/:courseId" element={<AssignTeachers />} />

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
                  element={<Navigate to="/admin/default" replace />} />

                <Route
                    path="/courses" element={<CoursesList />}/>
                <Route path="/courses/assign-teachers/:courseId" element={<AssignTeachers />} />

                <Route
                    path="/events" element={<EventsList />}/>
                <Route path="/events/details/:eventId" element={<EventDetails />} />

                <Route path="/events/edit/:eventId" element={<UpdateEvent />} />

              <Route path={"/exams"} element={<ExamsList/>}/>

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
