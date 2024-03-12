import React, { useEffect, useState } from 'react';
import { fetchArchivedCourses } from '../../../services/course/courseService';
import CourseDetailsModal from "./CourseDetailsModal";

const ArchivedCourses = () => {
    const [archivedCourses, setArchivedCourses] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDetailsClick = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    useEffect(() => {
        const getCourses = async () => {
            const fetchedCourses = await fetchArchivedCourses();
            setArchivedCourses(fetchedCourses);
        };
        getCourses().then(r => console.log(r));
    }, []);

    return (
        <>
            {selectedCourse && (
                <CourseDetailsModal
                    course={selectedCourse}
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}

            <div className="bg-white shadow-md rounded-lg">
                <div className="p-4">
                    <h2 className="font-semibold text-xl mb-4 text-gray-800">Archived Courses</h2>
                    <div className="space-y-3">
                        {Array.isArray(archivedCourses) && archivedCourses.map((course, index) => (
                            <div key={index} className="p-3 bg-gray-100 rounded-lg">
                                <h3 className="font-semibold text-lg">{course.title}</h3>
                                {/*<p className="text-sm text-gray-600">{course.description}</p>*/}
                                <div className="text-right">
                                    <button className="text-blue-500 hover:text-blue-600" key={course.id}
                                            onClick={() => handleDetailsClick(course)}>Details
                                    </button>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </>
    );
};

export default ArchivedCourses;
