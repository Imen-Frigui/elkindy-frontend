import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEnrollmentManagementModal = ({ isVisible, onClose }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [courseTitles, setCourseTitles] = useState({});

    useEffect(() => {
        if (isVisible) {
            fetchEnrollments();
        }
    }, [isVisible]);

    useEffect(() => {
        const fetchTitles = async () => {
            const titles = {};
            for (const user of enrollments) {
                for (const enrollment of user.enrollments) {
                    const courseId = enrollment.courseId ? enrollment.courseId._id : user.courseid;
                    if (courseId) {
                        try {
                            const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
                            titles[enrollment._id] = response.data.title;
                        } catch (error) {
                            console.error('Failed to fetch course details:', error);
                            titles[enrollment._id] = '';
                        }
                    }
                }
            }
            setCourseTitles(titles);
        };

        fetchTitles();
    }, [enrollments]);

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/enrollments/pending');
            setEnrollments(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
            setIsLoading(false);
        }
    };

    const updateCourseStatus = async (userId, courseId, newStatus) => {
        try {
            await axios.post(`http://localhost:3000/api/users/update-status`, { userId, courseId, newCourseStatus: newStatus });
            fetchEnrollments();  // Refresh list after updating
        } catch (error) {
            console.error('Failed to update course status:', error);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
                <h1 className="text-lg font-bold mb-4">Manage Enrollments</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    enrollments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 bg-gray-200 text-left">Username</th>
                                        <th className="py-2 px-4 bg-gray-200 text-left">Course Title</th>
                                        <th className="py-2 px-4 bg-gray-200 text-left">Status</th>
                                        <th className="py-2 px-4 bg-gray-200 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map(user => (
                                        user.enrollments.map(enrollment => (
                                            <tr key={enrollment._id}>
                                                <td className="py-2 px-4">{user.username}</td>
                                                <td className="py-2 px-4">{courseTitles[enrollment._id]}</td>
                                                <td className="py-2 px-4">{enrollment.status}</td>
                                                <td className="py-2 px-4">
                                                    <button onClick={() => updateCourseStatus(user.userId,user.courseid, 'accepted')} className="text-white bg-green-500 px-3 py-1 rounded-md mr-2">
                                                        Accept
                                                    </button>
                                                    <button onClick={() => updateCourseStatus(user.userId, user.courseid, 'rejected')} className="text-white bg-red-500 px-3 py-1 rounded-md">
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No pending enrollments.</p>
                    )
                )}
                <button onClick={onClose} className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AdminEnrollmentManagementModal;
