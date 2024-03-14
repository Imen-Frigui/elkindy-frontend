import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {fetchAssignedTeachers, fetchCourseById, updateCourseTeachers} from '../../services/course/courseService';
import { fetchTeachers } from '../../services/user/userService';
import {DndProvider, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTeacher from "./components/DraggableTeacher";
import   '../../assets/css/ScrollBar.css'


const AssignTeachers = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [assignedTeacherIds, setAssignedTeacherIds] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const fetchedCourse = await fetchCourseById(courseId);
            setCourse(fetchedCourse);
            if (fetchedCourse && Array.isArray(fetchedCourse.teachers)) {
                setAssignedTeacherIds(fetchedCourse.teachers.map(t => t._id));
            } else {
                setAssignedTeacherIds([]);
            }
            const fetchedTeachers = await fetchTeachers();
            const assignedTeachers = await fetchAssignedTeachers(courseId);
            setTeachers(fetchedTeachers);
            if (assignedTeachers) {
                setAssignedTeacherIds(assignedTeachers.map(teacher => teacher._id));
            }
        };
        fetchData();
    }, [ courseId]);

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
            console.log(assignedTeacherIds)
            await updateCourseTeachers(courseId, { teacherIds: assignedTeacherIds });
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
    //    <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col md:flex-row sm:flex-row mt-8  ">
                    <div className="scrollbar-styled flex flex-col mr-6 md:mr-6 mb-4 sm:mb-0 w-1/4 p-4 bg-gray-500 rounded-xl gap-y-4 overflow-y-auto max-h-96 ">
                        <h2 className="text-gray-800 text-xl">Available Teachers</h2>
                        {teachers.filter(teacher => !assignedTeacherIds.includes(teacher._id)).map(teacher => (
                            <div className="flex items-center justify-between" key={teacher.username}>
                                <DraggableTeacher key={teacher._id} teacher={teacher}
                                                  handleAssignTeacher={handleAssignTeacher}/>
                                <button className=" w-1/12 p-2 text-xs rounded-xl hover:shadow-xl"></button>
                            </div>
                        ))}
                </div>
                <div className="w-1/4 p-4 mr-6 md:mr-4 sm:mr-0 bg-gray-500 rounded-xl flex flex-col gap-y-4 " ref={drop}
                     style={{minHeight: '100px', backgroundColor: isOver ? 'lightgreen' : 'lightgrey'}}>
                    <h2 className="text-gray-800 text-xl">Assigned Teachers</h2>
                    {assignedTeacherIds.map(id => {
                        const teacher = teachers.find(t => t._id === id);
                        return teacher ? (
                            <div
                                className="flex items-center justify-between px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer"
                                key={id}>
                                <h1 className="text-gray-800 text-xl">{teacher.username}</h1>
                                    <button className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
                                            onClick={() => handleUnassignTeacher(id)}>Unassign
                                    </button>
                            </div>
                    ) : null;
                    })}
                </div>
                <div className="container w-2/4 mx-auto p-4">
                    <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-200 text-gray-800 text-xl font-semibold p-4">Course Details</div>
                        <div className="p-4">
                            <h2 className="text-gray-800 text-lg font-bold">{course.title}</h2>
                            <p className="text-gray-600">{course.description}</p>
                            <div className="mt-4">
                                <div className="text-gray-700 font-semibold">Category: <span
                                    className="font-normal">{course.category}</span></div>
                                <div className="text-gray-700 font-semibold">Price: <span
                                    className="font-normal">${course.price}</span></div>
                                {course.isInternship && (
                                    <>
                                        <div className="text-gray-700 font-semibold">Start Date: <span className="font-normal">{new Date(course.startDate).toLocaleDateString()}</span></div>
                                        <div className="text-gray-700 font-semibold">End Date: <span className="font-normal">{new Date(course.endDate).toLocaleDateString()}</span></div>
                                    </>
                                )}
                                <div className={`text-gray-700 font-semibold mt-2`}>Internship: <span
                                    className={`font-normal ${course.isInternship ? 'text-green-500' : 'text-red-500'}`}>{course.isInternship ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                onClick={handleSave}>Save
                            </button>
                        </div>
                    </div>
                </div>

            </div>
      //  </DndProvider>
    );
};

export default AssignTeachers;