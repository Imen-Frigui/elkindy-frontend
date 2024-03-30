import React, { useState, useEffect } from 'react';
import { fetchClassesByCourse, updateClassTeachers } from '../../../services/class/classService';

const ClassAssignment = ({ courseId, onClassUpdate }) => {
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [assignedTeacherIds, setAssignedTeacherIds] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const fetchedClasses = await fetchClassesByCourse(courseId);
            setClasses(fetchedClasses || []);
        };

        fetchClasses();
    }, [courseId]);

    const handleClassChange = async (e) => {
        setSelectedClassId(e.target.value);
    };

    const handleUpdateClassTeachers = async () => {
        try {
            await updateClassTeachers(selectedClassId, { teacherIds: assignedTeacherIds });
            onClassUpdate(); // Notify parent component about the update
        } catch (error) {
            console.error('Failed to update class teachers:', error);
        }
    };

    return (
        <div>
            <select value={selectedClassId} onChange={handleClassChange} className="dropdown-class-select">
                <option value="">Select a class</option>
                {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                        {classItem.name}
                    </option>
                ))}
            </select>
            {/* Add UI elements for assigning/unassigning teachers to the selected class */}
            <button onClick={handleUpdateClassTeachers}>Update Class Teachers</button>
        </div>
    );
};

export default ClassAssignment;
