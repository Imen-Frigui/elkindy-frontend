import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import CoursesList from "./views/course/CoursesList";
import AssignTeachers from "./views/course/AssignTeachers"
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} >
          <Route path="courses" element={<CoursesList />} />
          <Route path="courses/assign-teachers/:courseId" element={<AssignTeachers />} />
      </Route>
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
        {/* <Route path="/assign-teachers/:courseId" element={<AssignTeachers />} /> */}
    </Routes>
  );
};

export default App;
