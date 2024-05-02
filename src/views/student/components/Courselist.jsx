import React, { useState, useEffect } from 'react';
import ClassCard from './ClassCard'; // Assuming the ClassCard component is in the same directory

const CourseList = () => {
    const [courses, setCourses] = useState([]);
 
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/65fc4c74e36050b02b1ea6c9/courses');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div>
            <h2>All Courses</h2>
            {courses.map(course => (
                <ClassCard key={course._id} classInfo={course} />
            ))}
        </div>
    );
};

export default CourseList;
