import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import CoursesList from "./views/course/CoursesList";
import EventsList from "./views/events/EventsList";
import TicketsList from "./views/tickets/TicketsList";
import AssignTeachers from "./views/course/AssignTeachers"
import EventDetails from "./views/events/components/EventDetails"
import UpdateEvent from "./views/events/components/UpdateEvent"

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} >
            <Route path="courses"  element={<CoursesList />}/>
            <Route path="courses/assign-teachers/:courseId" element={<AssignTeachers />} />
            <Route path="events/details/:eventId" element={<EventDetails />} />
            <Route path="events/edit/:eventId" element={< UpdateEvent />} />
            <Route path="events" element={< EventsList />} />
            <Route path="tickets" element={< TicketsList />} />

        </Route>
        <Route path="rtl/*" element={<RtlLayout />} />
    </Routes>
  );
};

export default App;
