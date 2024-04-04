import React, {useState, useEffect, useCallback} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchAssignedTeachers,
    fetchCourseById,
    updateCourseTeachers,
    uploadCourseImage
} from '../../services/course/courseService';
import { fetchTeachers } from '../../services/user/userService';
import { useDrop} from 'react-dnd';

import DraggableTeacher from "./components/DraggableTeacher";
import   '../../assets/css/ScrollBar.css'
import CourseClassesList from "./components/CourseClassesList";
import CourseSchedule from "./components/CourseSchedule";
import {useDropzone} from "react-dropzone";


const AssignTeachers = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [assignedTeacherIds, setAssignedTeacherIds] = useState([]);

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null)


    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }, []);

    const handleUpload = async () => {
        if (file) {
            try {
                const result = await uploadCourseImage(courseId, file);
                console.log('Image uploaded successfully:', result);
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });




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
            await handleUpload();
            setFile(null)
            setPreviewUrl(null);
            //navigate(`/admin/courses`);
        } catch (error) {
            console.error('Failed to update course teachers:', error);
        }
        const updatedCourse = await fetchCourseById(courseId);
        setCourse(updatedCourse);
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

    const [showCalendar, setShowCalendar] = useState(false);

    const handleToggleCalendar = () => setShowCalendar(!showCalendar);

    return (
        <div className="container mx-auto px-4">
            {/*<button
                className="toggle-calendar-view-btn"
                onClick={handleToggleCalendar}
            >
                {showCalendar ? "Hide Schedule" : "View Class Schedule"}
            </button>

            {/* Conditional rendering of the Calendar Component
            {showCalendar && <CourseSchedule courseId={courseId} />}*/}
            <div className="flex flex-col md:flex-row sm:flex-row mt-8  md:space-y-0 md:space-x-4">
                <div
                    className="scrollbar-styled flex flex-col space-y-4 w-full md:w-1/4 p-4 bg-gray-500 rounded-xl overflow-y-auto max-h-96">
                    <h2 className="text-gray-800 text-xl">Available Teachers</h2>
                    {teachers.filter(teacher => !assignedTeacherIds.includes(teacher._id)).map(teacher => (
                        <div className="flex items-center justify-between" key={teacher.username}>
                            <DraggableTeacher key={teacher._id} teacher={teacher}
                                              handleAssignTeacher={handleAssignTeacher}/>
                            <button className="p-2 text-xs rounded-xl hover:shadow-xl"></button>
                        </div>
                    ))}
                </div>
                <div className="scrollbar-styled flex flex-col space-y-4 w-full md:w-1/4 p-4 bg-gray-500 rounded-xl overflow-y-auto max-h-96" ref={drop}
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
                <div className=" flex flex-col space-y-4 w-full md:w-2/4 p-4 bg-white shadow-lg rounded-lg">
                    <div className="bg-gray-200 text-gray-800 text-xl font-semibold p-4">Course Details</div>
                    {course.image && <img src={course.image} alt="Course Image" className="object-cover rounded-lg shadow-lg"/>}
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
                                    <div className="text-gray-700 font-semibold">Start Date: <span
                                        className="font-normal">{new Date(course.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-gray-700 font-semibold">End Date: <span
                                        className="font-normal">{new Date(course.endDate).toLocaleDateString()}</span>
                                    </div>
                                </>
                            )}
                            <div className={`text-gray-700 font-semibold mt-2`}>Internship: <span
                                className={`font-normal ${course.isInternship ? 'text-green-500' : 'text-red-500'}`}>{course.isInternship ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    </div>

                    <div {...getRootProps()}
                         className={`dropzone p-4 border-dashed border-2 rounded-lg ${isDragActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p className="text-center">Drop the files here ...</p> :
                                <p className="text-center">Drag & Drop your picture, or click to select files</p>
                        }
                    </div>
                    {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 max-w-xs max-h-64 object-cover"/>}
                        <button
                            className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex justify-center border border-transparent shadow-sm text-sm"
                            onClick={handleSave}>Save
                        </button>
                </div>
            </div>
            <div className="mt-8">

                <CourseClassesList courseId={courseId}/>
            </div>
        </div>
    );
};
export default AssignTeachers;