import React, { useState, useEffect } from 'react';
import { fetchCourseById } from '../../../services/course/courseService';

const GenerateClassesPanel = ({ courseId, onGenerate, onClose }) => {
    const [maxStudentsPerClass, setMaxStudentsPerClass] = useState(20); // default max students per class
    const [courseDetails, setCourseDetails] = useState({
        teacherCount: 0,
        studentCount: 0,
    });

    // Fetch course details to get counts of teachers and students
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const course = await fetchCourseById(courseId);
                if (course) {
                    setCourseDetails({
                        teacherCount: course.teacher ? course.teacher.length : 0,
                        studentCount: course.students ? course.students.length : 0,
                    });
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    return (
        <div className="bg-white border rounded-lg shadow-lg p-4 z-10">
            <div className="text-lg font-semibold mb-4">Generate Classes</div>
            <p>Teachers Assigned to Course: {courseDetails.teacherCount}</p>
            <p>Students Enrolled in Course: {courseDetails.studentCount}</p>
            <div className="mb-4">
                <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700">Max Students per Class</label>
                <input
                    type="number"
                    id="maxStudents"
                    value={maxStudentsPerClass}
                    onChange={e => setMaxStudentsPerClass(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => onGenerate(maxStudentsPerClass)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Generate
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default GenerateClassesPanel;
