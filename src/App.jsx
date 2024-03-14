// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import CoursesList from "./views/course/CoursesList";
import EventsList from "./views/events/EventsList";
import TicketsList from "./views/tickets/TicketsList";
import AssignTeachers from "./views/course/AssignTeachers"
import PrivateRoute from "views/auth/PrivateRoute";
import EventDetails from "views/events/components/EventDetails";
import UpdateEvent from "views/events/components/UpdateEvent";



const App = () => {
  return (
    <Routes>
     <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="auth/*" element={<AuthLayout />} />
      
     {/*<Route element={<PrivateRoute allowedRoles={['admin']} />}>*/}
        <Route path="admin/*" element={<AdminLayout />}>
          <Route path="courses"  element={<CoursesList />}/>
          <Route path="courses/assign-teachers/:courseId" element={<AssignTeachers />} />
            <Route path="events" element={< EventsList />} />
            <Route path="events/details/:eventId" element={<EventDetails />} />
            <Route path="events/edit/:eventId" element={< UpdateEvent />} />
            <Route path="tickets" element={< TicketsList />} />

        </Route>
        <Route path="rtl/*" element={<RtlLayout />} />
        {/* <Route path="/assign-teachers/:courseId" element={<AssignTeachers />} /> */}
    </Routes>
  );
};

export default App;
