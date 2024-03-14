import React, { useEffect, useState } from 'react';
import { fetchArchivedCourses } from '../../../services/course/courseService';
import CourseDetailsModal from "./CourseDetailsModal";

const ArchivedCourses = () => {
    const [archivedCourses, setArchivedCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDetailsClick = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    useEffect(() => {
        const getCourses = async () => {
            const fetchedCourses = await fetchArchivedCourses(currentPage, pageSize);
            console.log(fetchedCourses);
            setArchivedCourses(fetchedCourses.data);
            setTotalPages(fetchedCourses.totalPages);
        };
        getCourses();
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleCourseDeleted = async () => {
        const fetchedCourses = await fetchArchivedCourses(currentPage, pageSize);
        setArchivedCourses(fetchedCourses.data);
        setTotalPages(fetchedCourses.totalPages);
    };


    return (
        <>
            {selectedCourse && (
                <CourseDetailsModal
                    course={selectedCourse}
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onCourseDeleted={handleCourseDeleted}
                />
            )}

            <div className="bg-white shadow-md rounded-lg dark:bg-gray-800">
                <div className="p-4">
                    <h2 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-200">Archived Courses</h2>
                    <div className="space-y-3">
                        {Array.isArray(archivedCourses) && archivedCourses.map((course, index) => (
                            <div key={index} className="p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                                <h3 className="font-semibold text-lg dark:bg-gray-700">{course.title}</h3>
                                {/*<p className="text-sm text-gray-600">{course.description}</p>*/}
                                <div className="text-right">
                                    <button className="text-blue-500 hover:text-blue-600 dark:text-white" key={course.id}
                                            onClick={() => handleDetailsClick(course)}  >Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-center items-center mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 py-1 mx-1 rounded text-gray-800 hover:bg-gray-200 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 py-1 mx-1 rounded text-gray-800 hover:bg-gray-200 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-600"                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArchivedCourses;
