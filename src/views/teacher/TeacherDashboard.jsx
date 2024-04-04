import Greeting from "./components/Greeting";
import NextCourseCard from "./components/NextCourseCard";
import {useEffect, useState} from "react";
import axios from "axios";
import AttendanceSheet from "./components/AttendanceSheet";
import ClassSelector from "./components/ClassSelector";
//import TeacherSchedule from "./TeacherSchedule";

const TeacherDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        if (!userData) {
            fetchUserData().then(r => console.log(r, 'userData', userData));
        }
    }, [userData]);

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
                    <NextCourseCard teacherId={teacherId}/>
                </div>
                {teacherId && (
                    <div className="mt-4 lg:mt-0 lg:flex-grow">
                        <ClassSelector teacherId={teacherId} onSelectClass={setSelectedClassId}/>
                    </div>
                )}
            </div>
            <div className="w-full mb-4">
                {selectedClassId && <AttendanceSheet classId={selectedClassId}/>}
            </div>
        </div>
)
    ;
}
export default TeacherDashboard;