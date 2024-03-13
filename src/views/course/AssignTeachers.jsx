import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById, updateCourseTeachers } from '../../services/course/courseService';
import { fetchTeachers } from '../../services/user/userService';
import {DndProvider, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTeacher from "./components/DraggableTeacher";


const AssignTeachers = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [assignedTeacherIds, setAssignedTeacherIds] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const fetchedCourse = await fetchCourseById(courseId);
            console.log('Fetched Course:', fetchedCourse);
            setCourse(fetchedCourse);
            if (fetchedCourse && Array.isArray(fetchedCourse.teachers)) {
                setAssignedTeacherIds(fetchedCourse.teachers.map(t => t._id));
            } else {
                setAssignedTeacherIds([]);
            }
            const fetchedTeachers = await fetchTeachers();
            setTeachers(fetchedTeachers);
            console.log('Fetched Course:', fetchedTeachers);
        };
        fetchData();
    }, [courseId]);

    const handleAssignTeacher = (teacherId) => {
        if (!assignedTeacherIds.includes(teacherId)) {
            setAssignedTeacherIds(prev => [...prev, teacherId]);
        }
    };

    const handleUnassignTeacher = (teacherId) => {
        setAssignedTeacherIds(prev => prev.filter(id => id !== teacherId));
    };

    const handleSave = async () => {
        try {
            await updateCourseTeachers(courseId, assignedTeacherIds);
            navigate(`/admin/courses`);
        } catch (error) {
            console.error('Failed to update course teachers:', error);
        }
    };



    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'teacher',
        drop: (item, monitor) => {
            handleAssignTeacher(item.id);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex">
                <div className="w-1/3 p-4 mr-6 bg-gray-500 rounded-xl flex flex-col gap-y-4">
                    <h2 className="text-gray-800 text-xl">Available Teachers</h2>
                    {teachers.map(teacher => (
                        <div className="flex items-center justify-between" key={teacher.username} >
                            <DraggableTeacher key={teacher._id} teacher={teacher}
                                          handleAssignTeacher={handleAssignTeacher}/>
                            <button  className=" w-1/12 p-2 text-xs rounded-xl hover:shadow-xl"></button>
                        </div>
                    ))}
                </div>
                <div className="w-1/3 p-4 mr-6 bg-gray-500 rounded-xl flex flex-col gap-y-4 " ref={drop}
                     style={{minHeight: '100px', backgroundColor: isOver ? 'lightgreen' : 'lightgrey'}}>
                    <h2>Assigned Teachers</h2>
                    {assignedTeacherIds.map(id => {
                        const teacher = teachers.find(t => t._id === id);
                        return teacher ? (
                            <div className="px-2 py-4 bg-white flex items-center justify-between shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer" key={id}>
                                {teacher.username}
                                <button className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl" onClick={() => handleUnassignTeacher(id)}>Unassign</button>
                            </div>
                        ) : null;
                    })}
                </div>
                <button className="w-1/3 border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl" onClick={handleSave}>Save Assignments</button>
            </div>
        </DndProvider>
    );
};

export default AssignTeachers;