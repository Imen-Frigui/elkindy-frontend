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
        await updateCourseTeachers(courseId, { teachers: assignedTeacherIds });
        navigate(`/admin/courses`);
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
            <div className="w-1/2">
                <h2>Available Teachers</h2>
                {teachers.map(teacher => (
                    <DraggableTeacher key={teacher._id} teacher={teacher} handleAssignTeacher={handleAssignTeacher} />
                ))}
            </div>
            <div className="w-1/2" ref={drop}
                 style={{minHeight: '100px', backgroundColor: isOver ? 'lightgreen' : 'lightgrey'}}>
                <h2>Assigned Teachers</h2>
                {assignedTeacherIds.map(id => {
                    const teacher = teachers.find(t => t._id === id);
                    return teacher ? (
                        <div className="text-kindyorange bg-fontcolor" key={id}>
                            {teacher.username}
                            <button onClick={() => handleUnassignTeacher(id)}>Unassign</button>
                        </div>
                    ) : null;
                })}
            </div>
            <button onClick={handleSave}>Save Assignments</button>
        </div>
        </DndProvider>
    );
};

export default AssignTeachers;
