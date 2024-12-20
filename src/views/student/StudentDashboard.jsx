import Greeting from "./components/Greeting";
import NextCourseCard from "./components/NextCourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import AttendanceSheet from "./components/AttendanceSheet";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/button/Loader";
import { fetchUserData } from '../../slices/userSlice';

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const { userData, isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUserData());

    }, [userData]);

    const isStudent = userData?.user?.role === 'student';
    const studentId = userData?.user?._id;
    console.log(studentId)
    console.log(userData)
    console.log('isStudent', isStudent);
    console.log('userId', studentId);


    return (
        <div>
            <div className="flex flex-col justify-between lg:flex-row lg:items-start lg:space-x-4">
                <div className="flex flex-col space-y-4">
                    <Greeting username={userData?.user?.username} gender={userData?.user?.gender} />
                </div>
                {/*studentId && (
                    <div className="mt-4 lg:mt-0 lg:flex-grow">
                        <ClassSelector teacherId={studentId} onSelectClass={setSelectedClassId}/>
                    </div>
                )*/}
            </div>
            <div className="w-full mb-4">
                {studentId && (<AttendanceSheet studentId={studentId} />)}
            </div>
        </div>
    );
}
export default StudentDashboard;