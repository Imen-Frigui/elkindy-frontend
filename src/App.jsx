import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import CoursesList from "./views/course/CoursesList";
import EvaluationList from "./views/teacherExam/evaluation";
import EventsList from "./views/events/EventsList";
import TicketsList from "./views/tickets/TicketsList";
import AssignTeachers from "./views/course/AssignTeachers";
import PrivateRoute from "views/auth/PrivateRoute";
import EventDetails from "./views/events/components/EventDetails"
import UpdateEvent from "./views/events/components/UpdateEvent"
import AddEvent from "./views/events/components/AddEvent"
import ArchivedEventsList from "./views/events/components/ArchivedEventsList"
import SignIn from "views/auth/SignIn";
import RegisterPage from "views/auth/register";
import ForgotPassword from "views/auth/Password/forgotPassword";
import ResetPassword from "views/auth/Password/resetPassword";
import Student from "layouts/student";
import Teacher from "layouts/teacher";
import Conversations from "views/chat/Conversations";
import StudentEnroll from "views/auth/StudentFormEnroll";
import Quiz from "components/ui/Quiz";
import QuizGame from "components/ui/QuizGame";




const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
            <Route path="auth/*" element={<AuthLayout />} >
            </Route>
            <Route path="auth/forgot-password" element={<ForgotPassword />} />
            <Route path="auth/reset-password" element={<ResetPassword />} />



            <Route element={<PrivateRoute allowedRoles={'teacher'} />}>
                <Route path="teacher/*" element={<Teacher />}>
                </Route>
            </Route>

            {/*}
            <Route element={<PrivateRoute allowedRoles={'teacher'} />}>
                <Route path="teacher/*" element={<Teacher />}>
                </Route>
            </Route>*/}

            <Route element={<PrivateRoute allowedRoles={'student'} />}>
                <Route path="student/*" element={<Student />}>
                </Route>
            </Route>

            <Route element={<PrivateRoute allowedRoles={['admin', 'teacher']} />}>
                <Route path="admin/*" element={<AdminLayout />}>
                </Route>
            </Route>

            <Route path="courses" element={<CoursesList />} />
            <Route path="courses/assign-teachers/:courseId" element={<AssignTeachers />} />
            <Route path="events" element={< EventsList />} />
            <Route path="events/details/:eventId" element={<EventDetails />} />
            <Route path="events/edit/:eventId" element={< UpdateEvent />} />
            <Route path="events" element={< EventsList />} />
            <Route path="events/archived" element={<ArchivedEventsList />} />
            <Route path="events/addevent" element={<AddEvent />} />
            <Route path="tickets" element={< TicketsList />} />

            <Route path="home/*" element={<RtlLayout />} />
            <Route path="evaluations" element={<EvaluationList />} />
            <Route path="chat" element={<Conversations />} />
            <Route path="chat/quiz" element={<QuizGame />} />
            <Route path="auth/register/:courseId" element={<StudentEnroll />} />
            <Route path="home/*" element={<RtlLayout />} />
            <Route path="evaluations" element={<EvaluationList />} />

            {/* <Route path="/assign-teachers/:courseId" element={<AssignTeachers />} /> */}
        </Routes>
    );
};

export default App;