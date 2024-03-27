import React, { useEffect, useState } from 'react';
import { fetchClassesForTeacher, fetchClassStats, fetchStudentsByClassId } from '../../../services/class/classService';
import StatCard from "./StatCard";

const ClassSelector = ({ teacherId, onSelectClass }) => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState({});
    const [students, setStudents] = useState([]);

    const [classStats, setClassStats] = useState({
        totalCount: 0,
        malePercentage: 0,
        femalePercentage: 0
    });

    useEffect(() => {
        const loadClasses = async () => {
            const classesData = await fetchClassesForTeacher(teacherId);
            setClasses(classesData);
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

    return (
        <div className="container flex flex-col items-center mt-8 mb-4 ">
            <select onChange={(e) => handleClassChange(e.target.value)}
                    className="mb-4 w-full md:w-1/2 p-2 bg-white dark:bg-gray-700 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"                    defaultValue="">
                <option value="" disabled>Select a Class</option>
                {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>{cls.name}</option>
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
                <div className="mt-4 w-full md:w-1/2">
                    <h3 className="text-3xl text-gray-800 font-normal dark:text-gray-200 mb-4">Student List</h3>
                    <ol className="space-y-3 overflow-auto h-36">
                        {students.map((student, index) => (
                            <li key={student._id} className="flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-kindyorange flex items-center justify-center text-white mr-4 dark:bg-indigo-500">
                                    {index + 1}
                                </div>
                                <span className="flex-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                                    {student.username}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default ClassSelector;
