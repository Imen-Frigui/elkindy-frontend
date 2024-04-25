import Greeting from "./components/Greeting";
import NextCourseCard from "./components/NextCourseCard";
import React, {useEffect, useState} from "react";
import AttendanceSheet from "./components/AttendanceSheet";
import ClassSelector from "./components/ClassSelector";
import {fetchUserData} from "../../slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/button/Loader";
import AttendanceStats from "./components/AttendanceStats";

//import TeacherSchedule from "./TeacherSchedule";

const TeacherDashboard = () => {
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
    console.log(teacherId)
    console.log(userData)
    console.log('isTeacher', isTeacher);


    return (
        <div>
            <div className="flex flex-col justify-between lg:flex-row lg:items-start lg:space-x-4">
                <div className="flex flex-col space-y-4">
                    <Greeting username={userData?.user?.username} gender={userData?.user?.gender}/>
                    <NextCourseCard teacherId={userData?.user?._id}/>
                </div>
                {teacherId && (
                    <div className="mt-4 lg:mt-0 lg:flex-grow">
                        <ClassSelector teacherId={userData?.user?._id} onSelectClass={setSelectedClassId}/>
                    </div>
                )}
            </div>
            <div className="w-full mb-4">
                {selectedClassId && <AttendanceSheet classId={selectedClassId}/>}
            </div>
            <AttendanceStats classId={selectedClassId}/>
        </div>
)
    ;
}
export default TeacherDashboard;