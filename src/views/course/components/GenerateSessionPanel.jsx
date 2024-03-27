import React, { useState, useEffect } from 'react';
import { createRepeatingSessions, fetchTeachersByClassId } from '../../../services/class/classService';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const GenerateSessionPanel = ({ classId, onClose }) => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [room, setRoom] = useState('');
    const [repeatCount, setRepeatCount] = useState(1);
    const [selectedTeacher, setSelectedTeacher] = useState('');

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const loadTeachers = async () => {
            try {
                const fetchedTeachers = await fetchTeachersByClassId(classId);
                setTeachers(fetchedTeachers);
            } catch (error) {
                console.error('Failed to fetch teachers:', error);
            }
        };

        if (classId) {
            loadTeachers();
        }
    }, [classId]);

    const handleSubmit = async () => {
        const sessionDetails = {
            classId,
            room,
            startDate,
            startTime,
            endTime,
            repeatCount: parseInt(repeatCount, 10),
            teacher: selectedTeacher,
        };
        try {
            await createRepeatingSessions(sessionDetails);
            toast.success("Sessions created successfully!");
            onClose();
        } catch (error) {
            console.error('Error creating repeating sessions:', error);
            toast.error("Error creating repeating sessions.");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
            <div className="grid grid-cols-1 mx-auto p-4" >
                <label >Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mx-auto border-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                <label >Start Time:</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mx-auto border-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                <label >End Time:</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mx-auto border-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                <label >Room:</label>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Room"
                    className="mx-auto border-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                <label >Repeat Count:</label>
                <input
                    type="number"
                    value={repeatCount}
                    onChange={(e) => setRepeatCount(e.target.value)}
                    placeholder="Repeat Count"
                    className="mx-auto border-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                <label >Teacher:</label>
                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="mx-auto border-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>{teacher.username}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end mt-4 mb-4">
                <ToastContainer/>
                <button onClick={handleSubmit}
                        className="mx-auto border-2 bg-kindyorange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    Create Sessions
                </button>
                <button onClick={onClose}
                        className="mx-auto border-2 bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">
                    Close
                </button>
            </div>
        </div>
    );
};

export default GenerateSessionPanel;
