import React, { useEffect, useState } from 'react';
import { fetchClassesForTeacher, fetchClassStats, fetchStudentsByClassId } from '../../../services/class/classService';
import StatCard from "./StatCard";

const ClassSelector = ({ teacherId, onSelectClass }) => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState({});
    const [students, setStudents] = useState([]);
    const airtableBaseURL = "https://airtable.com/app7HFiWwZspxCDK0";

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

    const [note, setNote] = useState({ title: '', content: '' });
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handler to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Handler to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setNote({ title: '', content: '' });  // Reset note state when modal closes
    };

    const submitNote = async () => {
        if (!selectedStudent) return;

        const payload = {
            title: note.title,
            content: note.content,
            studentName: selectedStudent.username,
        };

        try {
            const response = await fetch('http://localhost:3000/api/courses/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Note added successfully');
                setNote({ title: '', content: '' });
                closeModal()
            } else {
                throw new Error('Failed to add note');
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };


    return (
        <div className="container flex flex-col items-center mt-8 mb-4 ">
            <select onChange={(e) => handleClassChange(e.target.value)}
                    className="mb-4 w-full max-w-md p-2 bg-white dark:bg-gray-700 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                <option value="" >Select a Class</option>
                {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>{cls.name} - {cls.courseId?.title}</option>
                ))}
            </select>
            <NoteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={submitNote}
                note={note}
                setNote={setNote}
            />
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
                <div className="mt-4 w-full max-w-md">
                    <h3 className="text-lg md:text-xl text-gray-800 font-normal dark:text-gray-200 mb-4">Student List</h3>
                    <ol className="space-y-3 overflow-auto h-36">
                        {students.map((student, index) => (
                            <li key={student._id} className="flex items-center"
                                onClick={() => setSelectedStudent(student)}>
                                <div
                                    className="w-8 h-8 rounded-full bg-kindyorange flex items-center justify-center text-white mr-4 dark:bg-indigo-500">
                                    {index + 1}
                                </div>
                                <span
                                    className="flex-1 p-2 mr-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                                    {student.username}
                                </span>
                                <button onClick={openModal}
                                        className=" border-transparent rounded-[15px] border-2 px-3 text-sm focus:ring-2 my-1 mr-2 bg-indigo-50 py-2 text-kindyblue">Add Note
                                </button>

                            </li>
                        ))}
                    </ol>
                    <button
                        onClick={() => window.open(airtableBaseURL, '_blank')}
                        className=" border-transparent rounded-[15px] border-2  text-sm  mt-4 bg-kindyyellowlight hover:bg-kindyyellowlight text-white py-2 px-4 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                        View Airtable Base
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClassSelector;

function NoteModal({isOpen, onClose, onSubmit, note, setNote}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Add Note</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-6">
                    <textarea
                        placeholder="Note Content"
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 h-32"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Submit Note
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
