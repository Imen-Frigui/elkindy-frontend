import Greeting from "./components/Greeting";
import NextCourseCard from "./components/NextCourseCard";
import {useEffect, useState} from "react";
import axios from "axios";
import AttendanceSheet from "./components/AttendanceSheet";

const TeacherDashboard = () => {
    const [userData, setUserData] = useState(null);


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
    const idTeacher = userData?.user?._id;
    console.log(idTeacher)
    console.log(userData)
    console.log('isTeacher', isTeacher);
    const classId = "65fdb45d109f0caf0bf53434";


    return (
        <div className="flex flex-col">
            <Greeting username={userData?.user?.username}></Greeting>
            <NextCourseCard teacherId={idTeacher}></NextCourseCard>
            <AttendanceSheet classId={classId} />
        </div>
    );
}

export default TeacherDashboard;