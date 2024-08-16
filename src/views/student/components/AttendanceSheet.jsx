import React, { useState, useEffect } from 'react';
import { fetchAttendanceForStudent } from '../../../services/class/classService';
import '../../../assets/css/Table.css'
const AttendanceSheet = ({ studentId }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [organizedData, setOrganizedData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchAttendanceForStudent(studentId);
                if (response && response.attendanceRecords) {
                    setAttendanceRecords(response.attendanceRecords);
                    organizeData(response.attendanceRecords);
                } else {
                    console.error('Attendance records not found in the response:', response);
                }
            } catch (error) {
                console.error('Error loading attendance data:', error);
            }
        };

        loadData();
    }, [studentId]);

    const organizeData = (records) => {
        const data = {};
        records.forEach(record => {
            const key = `${record.course} - ${record.class}`;
            if (!data[key]) {
                data[key] = [];
            }
            data[key].push(record);
        });
        setOrganizedData(data);
    };

    return (
        <div className="attendance-sheet-container mx-auto p-4">
            <div className="overflow-x-auto">
                {Object.entries(organizedData).map(([key, records]) => (
                    <div key={key}>
                        <h3 className="text-left font-medium text-lg mb-2">{key}</h3>
                        <table className="attendance-table min-w-full divide-y divide-gray-200 mb-4 table-auto">
                            <thead>
                            <tr>
                                {records.map((record, index) => (
                                    <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {new Date(record.date).toLocaleDateString()}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                {records.map((record, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-center">
                                        {record.status}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendanceSheet;
