import React, { useState, useEffect } from 'react';

const AttendanceRates = ({ classId }) => {
    const [attendanceData, setAttendanceData] = useState({});

    useEffect(() => {
        const fetchAttendanceRates = async () => {
            const response = await fetch(`http://localhost:3000/api/classes/attendance-rate/${classId}`);
            const data = await response.json();
            setAttendanceData(data);
        };

        fetchAttendanceRates();
    }, [classId]);

    return (
        <div>
            <h1>Attendance Rates</h1>
            <table>
                <thead>
                <tr>
                    <th>Student</th>
                    <th>Attendance Rate</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(attendanceData).map(([studentId, record]) => (
                    <tr key={studentId}>
                        <td>{record.username}</td>
                        <td>{(record.rate * 100).toFixed(2)}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceRates;
