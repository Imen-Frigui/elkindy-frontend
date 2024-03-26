import React, { useState, useEffect } from 'react';
import { fetchSessionsByClassId, fetchStudentsByClassId, manageAttendanceForSession } from '../../../services/class/classService';
import '../../../assets/css/Table.css'
import ButtonComponent from "../../../components/button/ButtonComponnent";
import {orange} from "@mui/material/colors";
const AttendanceSheet = ({ classId }) => {
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

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

        fetchData();
    }, [classId]);

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
                status: attendance[session._id]?.[student._id] || 'Absent' // default to 'Absent' if not set
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

    return (
        <div className="attendance-sheet-container">
            <table className="attendance-table min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    <th>Students</th>
                    {sessions.map(session => (
                        <th key={session._id}>{new Date(session.date).toLocaleDateString()}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student._id}>
                        <td>{student.username}</td>
                        {sessions.map(session => (
                            <td key={`${session._id}-${student._id}`} onClick={() => handleAttendanceChange(session._id, student._id)}>
                                {attendance[session._id]?.[student._id] || '-'}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <ButtonComponent color="orange" text="Submit Attendance" onClick={submitAttendance}>Submit Attendance</ButtonComponent>
        </div>
    );
};

export default AttendanceSheet;
