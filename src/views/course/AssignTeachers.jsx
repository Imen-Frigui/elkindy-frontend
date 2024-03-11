import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { fetchCourseById, updateCourse } from '../../services/course/courseService';
import { fetchTeachers } from '../../services/user/userService';

const AssignTeachers = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCourse = await fetchCourseById(courseId);
            setCourse(fetchedCourse);
            const fetchedTeachers = await fetchTeachers();
            setTeachers(fetchedTeachers);
        };

        fetchData().then(r => console.log (r));
    }, [courseId]);

    const handleTeacherSelectionChange = (teacherId) => {
        setSelectedTeacherIds(prevSelectedTeacherIds =>
            prevSelectedTeacherIds.includes(teacherId)
                ? prevSelectedTeacherIds.filter(id => id !== teacherId)
                : [...prevSelectedTeacherIds, teacherId]
        );
    };

    const handleAssignTeachers = async () => {
        await updateCourse(courseId, { teacher: selectedTeacherIds });
        navigate('/admin/courses');
    };

    return (
        <div>
            <h2>dd</h2>
            <h2>Assign Teachers to {course?.title}</h2>
            {teachers.map(teacher => (
                <div key={teacher._id}>
                    <input
                        type="checkbox"
                        checked={selectedTeacherIds.includes(teacher._id)}
                        onChange={() => handleTeacherSelectionChange(teacher._id)}
                    />
                    {teacher.firstName} {teacher.lastName}
                </div>
            ))}
            <button onClick={handleAssignTeachers}>Assign Selected Teachers</button>
        </div>
    );
};

export default AssignTeachers;
