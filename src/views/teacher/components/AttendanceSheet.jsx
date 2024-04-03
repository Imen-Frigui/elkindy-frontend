import React, { useState, useEffect } from 'react';
import { fetchSessionsByClassId, fetchStudentsByClassId, manageAttendanceForSession } from '../../../services/class/classService';
import '../../../assets/css/Table.css'
import ButtonComponent from "../../../components/button/ButtonComponnent";
import { FaCheck, FaTimes } from 'react-icons/fa';

const AttendanceSheet = ({ classId }) => {
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});


    const [isListening, setIsListening] = useState(false);
    const [spokenName, setSpokenName] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const sessionsData = await fetchSessionsByClassId(classId);
                const studentsData = await fetchStudentsByClassId(classId);
                setSessions(sessionsData);
                setStudents(studentsData);

                // Initialize the attendance object with existing attendance data
                const initialAttendance = sessionsData.reduce((acc, session) => ({
                    ...acc,
                    [session._id]: session.attendance.reduce((innerAcc, att) => ({
                        ...innerAcc,
                        [att.student]: att.status
                    }), {})
                }), {});
                setAttendance(initialAttendance);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (isListening) {
            startListening();
        }

        fetchData();
    }, [classId, isListening]);

    const handleAttendanceChange = (sessionId, studentId) => {
        const currentStatus = attendance[sessionId]?.[studentId] || '';
        const nextStatus = currentStatus === 'Present' ? 'Absent' : 'Present';

        setAttendance(prev => ({
            ...prev,
            [sessionId]: {
                ...prev[sessionId],
                [studentId]: nextStatus
            }
        }));
    };

    const submitAttendance = async () => {
        // Convert the attendance state to the array format your backend expects
        const attendanceData = sessions.map(session => ({
            sessionId: session._id,
            attendance: students.map(student => ({
                student: student._id,
                status: attendance[session._id]?.[student._id] || '-' // default to '-' if not set
            }))
        }));

        try {
            for (let data of attendanceData) {
                await manageAttendanceForSession(data.sessionId, { attendance: data.attendance });
            }
            alert('Attendance submitted successfully');
        } catch (error) {
            console.error('Failed to submit attendance:', error);
            alert('Failed to submit attendance');
        }
    };

    function levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    }

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            const formattedTranscript = transcript.replace(/\s/g, '');

            let closestMatch = '';
            let lowestDistance = Infinity;

            students.forEach((student) => {
                const currentDistance = levenshteinDistance(formattedTranscript, student.username.toLowerCase().replace(/\s/g, ''));
                if (currentDistance < lowestDistance) {
                    lowestDistance = currentDistance;
                    closestMatch = student.username;
                }
            });

            console.log(`Closest username match: ${closestMatch}`);
            setSpokenName(closestMatch);
        };


        recognition.onend = () => {
            setIsListening(false);
        };
    };
    const handleListenClick = () => {
        setIsListening(true);
    };




    return (
        <div className="mx-auto">
            <div className="overflow-x-auto">
                <button onClick={handleListenClick}>Start Listening</button>
                <table className="attendance-table min-w-full divide-y divide-gray-200 mb-4 table-auto">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                        {sessions.map(session => (
                            <th key={session._id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{new Date(session.date).toLocaleDateString()}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {students.map(student => (
                        <tr key={student._id} style={{ backgroundColor: spokenName === student.username ? 'lightblue' :''}} >
                            <td className="px-6 py-4 whitespace-nowrap" >{student.username}</td>
                            {sessions.map(session => (
                                <td key={`${session._id}-${student._id}`}
                                    onClick={() => handleAttendanceChange(session._id, student._id)}
                                    className="px-6 py-4 whitespace-nowrap cursor-pointer">
                                    {attendance[session._id]?.[student._id] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <ButtonComponent color="#3F51B5" text="Submit Attendance" onClick={submitAttendance}>Submit
                        Attendance</ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default AttendanceSheet;
