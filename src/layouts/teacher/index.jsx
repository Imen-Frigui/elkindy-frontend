{/* import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Footer from "components/footer/Footer";
import routes from "TeacherRoutes.js";

import EventDetails from "views/events/components/EventDetails";
import UpdateEvent from "views/events/components/UpdateEvent";
import CoursesList from "../../views/course/CoursesList";
import AssignTeachers from "../../views/course/AssignTeachers";
import ArchivedEventsList from "../../views/events/components/ArchivedEventsList";
import useSocketStore from "../../ZustStore/socketStore";
import SideBarrStudent from "components/sidebarrStudent";
import Dashboard from "views/student/newview";
import ProfileOverview from "views/admin/profile";
import SideBarrTeacher from "components/sidebarrTeacher";

export default function Teacher(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Teacher Dashboard");
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
  },[]);

  const getActiveRoute = (routes) => {
    console.log(routes)
    let activeRoute = "Teacher Dashboard";
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
      if (prop.layout === "/Teacher") {
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
      <SideBarrTeacher open={open} onClose={() => setOpen(false)} />
      {/* <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content
      <div className="h-full w-full bg-kindygray dark:!bg-navy-900">
        {/* Main Content
        <main
          className={`mx-[5px] h-full flex-none transition-all md:pr-2 xl:ml-[100px]`}
        >
          {/* Routes
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
              <Route path="profile" element={<ProfileOverview />} />
                <Route path="default" element={<Dashboard />} />
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
*/}