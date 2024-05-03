// CourseList.jsx
import React, { useState, useEffect } from 'react';
import ClassCard from './ClassCard';
import PaymentButton from './paymentComponenet';
import { fetchUserData } from '../../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/button/Loader';
import { data } from 'autoprefixer';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState(null);
    const dispatch = useDispatch();
    const { userData, isLoading,  } = useSelector((state) => state.user);
    const { setEror,error } = useState(null);
   
   
   
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            fetchCourses();
        }
    }, [userData]);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userData.user._id}/courses`);
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();

            const statuses = data.map(course => course.status[0]);

            setCourses(data);
            console.log(data);
           const xdd= statuses.toString();
            setStatus(xdd);
            console.log(xdd);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

 
    return (
        <div className="container mx-auto px-4 py-8 dark:bg-gray-800">
            {courses.length === 1 ? (
                <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 items-center">
                    <img src={courses[0].image || "https://via.placeholder.com/150"} alt="Course" className="w-40 h-40 rounded-full mx-auto md:mx-0 md:mr-6"/>
                    <div>
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">You are enrolled in this course and its {status}</h2>
                        <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">{courses[0].title}</h3>
                        <p className="text-gray-700 dark:text-gray-400 mb-4">{courses[0].description}</p>
                        {courses[0].price > 0 && <p className="text-gray-700 dark:text-gray-400 mb-4">Cost: ${courses[0].price}</p>}
                        {status === 'pending' ? (
                            <p className="text-red-500 dark:text-red-400">Your enrollment is pending</p>
                        ) : (
                            <div><PaymentButton courseId={courses[0]._id} /></div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">You need to enroll in a course</p>
                    {courses.map(course => (
                        <ClassCard key={course._id} classInfo={course}  userData={userData} courseId={course._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;
