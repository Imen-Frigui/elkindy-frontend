import React, { useState, useEffect } from 'react';
import { fetchClassesByCourse, generateClassesForCourse } from '../../../services/class/classService';
import GenerateClassesPanel from "./GenerateClassesPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const CourseClassesList = ({ courseId }) => {
    const [classes, setClasses] = useState([]);
    const [showGeneratePanel, setShowGeneratePanel] = useState(false);

    const navigate = useNavigate()


    const handleGenerateClasses = async (maxStudentsPerClass) => {
        try {
            const response = await generateClassesForCourse(courseId, maxStudentsPerClass);
            console.log(response);
            const updatedClasses = await fetchClassesByCourse(courseId);
            setClasses(updatedClasses)
        } catch (error) {
            console.error('Error generating classes:', error);
        }
    };


    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const fetchedClasses = await fetchClassesByCourse(courseId);
                setClasses(fetchedClasses);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchClasses();
    }, [courseId]);

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Classes for Course</h2>
                <button
                    onClick={() => setShowGeneratePanel(!showGeneratePanel)}
                    className="flex items-center rounded-lg bg-kindyorange py-2 px-4 text-white transition duration-300 hover:bg-opacity-80 focus:outline-none"
                >
                    Generate Classes
                </button>
            </div>
            <div className="container mx-auto p-4 w-full flex flex-row items-start space-x-4">
                <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-gray-200 text-gray-800 text-xl font-semibold p-4">Classes List</div>
                    <ul className="list-none p-4">
                        {classes.map((classItem, index) => (
                            <li key={index} className="border-b border-gray-200 p-2 hover:bg-gray-100">
                                {classItem.name}
                                <button
                                    onClick={() => navigate(`/admin/courses/${courseId}/class/${classItem._id}`)}
                                    className="button-with-tooltip">
                                    <FontAwesomeIcon icon={faInfoCircle}
                                                     style={{
                                                         color: '#FB9D37',
                                                         fontSize: '20px'
                                                     }}
                                                     className="mr-6"/>
                                    <span className="tooltip-text">
                                                        Details
                                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {showGeneratePanel && (
                    <GenerateClassesPanel
                        courseId={courseId}
                        onClose={() => setShowGeneratePanel(false)}
                        onGenerate={handleGenerateClasses}
                    />
                )}
            </div>
        </div>
    );
};

export default CourseClassesList;
