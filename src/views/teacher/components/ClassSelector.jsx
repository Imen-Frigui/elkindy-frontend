import React, { useEffect, useState } from 'react';
import { fetchClassesForTeacher, fetchClassStats, fetchStudentsByClassId } from '../../../services/class/classService';
import StatCard from "./StatCard";

import useShowToast from "hooks/useShowToast";
import DataService from 'services/marketplace/data.service';
import { ToastContainer } from "react-toastify";
import PredictionModal from 'components/ui/PredictionModal';

const ClassSelector = ({ teacherId, onSelectClass }) => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState({});
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const showToast = useShowToast();

    const [classStats, setClassStats] = useState({
        totalCount: 0,
        malePercentage: 0,
        femalePercentage: 0
    });

    useEffect(() => {
        const loadClasses = async () => {
            const classesData = await fetchClassesForTeacher(teacherId);
            setClasses(classesData);
            console.log(classesData)
        };

        if (teacherId) {
            loadClasses();
        }
    }, [teacherId]);

    useEffect(() => {
        const loadStudentsAndStats = async () => {
            if (selectedClass && selectedClass._id) {
                const studentsData = await fetchStudentsByClassId(selectedClass._id);
                setStudents(studentsData);

                const stats = await fetchClassStats(selectedClass._id);
                setClassStats({
                    totalCount: stats.totalCount,
                    malePercentage: stats.malePercentage,
                    femalePercentage: stats.femalePercentage
                });
            }
        };

        loadStudentsAndStats();
    }, [selectedClass]);

    const handleClassChange = (classId) => {
        const classObj = classes.find(cls => cls._id === classId);
        setSelectedClass(classObj);
        onSelectClass(classId);
    };

    const handleFinalExam = async (studentId) => {
        try {
            console.log(studentId)
            const token = localStorage.getItem('token');
            const prediction = await DataService.predictIStudentOutcome(studentId, token);
            setPrediction(prediction.prediction);
            setShowModal(true);
        } catch (error) {
            console.error("Error predicting final exam outcome:", error);
            showToast("Please ensure the student has filled in their details before predicting the final exam outcome.", "error");

        }
    }

    return (
        <div className="container flex flex-col items-center mt-8 mb-4 ">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <select onChange={(e) => handleClassChange(e.target.value)}
                className="mb-4 w-full max-w-md p-2 bg-white dark:bg-gray-700 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                <option value="" >Select a Class</option>
                {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>{cls.name} - {cls.courseId?.title}</option>
                ))}
            </select>
            {selectedClass && selectedClass._id && (
                <StatCard
                    title={selectedClass.name}
                    totalCount={classStats.totalCount}
                    stats={{
                        malePercentage: classStats.malePercentage,
                        femalePercentage: classStats.femalePercentage
                    }}
                />
            )}
            {students.length > 0 && (
                <div className="mt-4 w-full px-5">
                    <h3 className="text-lg md:text-xl text-gray-800 font-normal dark:text-gray-200 mb-4">Student List</h3>
                    <ol className="space-y-3 overflow-auto h-36 w-full">
                        {students.map((student, index) => (
                            <li key={student._id} className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-kindyorange flex items-center justify-center text-white mr-4 dark:bg-indigo-500">
                                    {index + 1}
                                </div>
                                <span className="flex-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                                    {student.username}
                                </span>
                                <div className='bg-kindyorange rounded-xl p-2 ml-2'>
                                    <button onClick={() => handleFinalExam(student._id)}
                                        className='text-white'>
                                        Predict Final Exam Outcome
                                    </button>
                                    <PredictionModal isOpen={showModal} onClose={() => setShowModal(false)} prediction={prediction} />


                                </div>

                            </li>
                        ))}

                    </ol>

                </div>
            )}
        </div>
    );
};

export default ClassSelector;
