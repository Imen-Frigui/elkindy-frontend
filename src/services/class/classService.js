const API_BASE_URL = 'http://localhost:3000/api';

// Fetch all classes
export const fetchClasses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch classes:", error);
        throw error;
    }
};

// Fetch class by ID
export const fetchClassById = async (classId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch class with ID ${classId}:`, error);
        throw error;
    }
};

// Create a new class
export const createClass = async (classData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classData),
        });

        if (!response.ok) {
            throw new Error('Failed to create class.');
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create class:", error);
        throw error;
    }
};

// Update a class
export const updateClass = async (classId, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error('Failed to update class.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to update class with ID ${classId}:`, error);
        throw error;
    }
};

// Delete a class
export const deleteClass = async (classId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete class.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to delete class with ID ${classId}:`, error);
        throw error;
    }
};


export const fetchClassesByCourse = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/by-course?courseId=${courseId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch classes for the specified course.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch classes for course ID ${courseId}:`, error);
        throw error;
    }
};

// Update class teachers
export const updateClassTeachers = async (classId, teacherIds) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}/teachers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teacherIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to update class teachers.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to update teachers for class ID ${classId}:`, error);
        throw error;
    }
};

export const generateClassesForCourse = async (courseId, maxStudentsPerClass, teacherIds) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId, maxStudentsPerClass, teacherIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate classes.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to generate classes for course ID ${courseId}:`, error);
        throw error;
    }
};

export const assignTeachersToClass = async (classId, teacherIds) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}/assign-teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teacherIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to assign teachers.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to assign teachers to class ID ${classId}:`, error);
        throw error;
    }
};

export const fetchNextSessionForTeacher = async (teacherId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/teachers/${teacherId}/sessions/upcoming`, {
            headers: {
                'Cache-Control': 'no-cache'
            }});
        return await response.json();
    } catch (error) {
        console.error(`Failed to assign teachers to teacher ID ${teacherId}:`, error);
        throw error;
    }
};


export const addStudentsToClass = async (classId, studentIds) => {
    try {
        const response = await fetch(`/api/classes/${classId}/add-students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to add students to the class.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to add students to class ID ${classId}:`, error);
        throw error;
    }
};
export const fetchSessionsByClassId = async (classId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/sessions/${classId}/sessions`);
        if (!response.ok) {
            throw new Error('Failed to fetch sessions for the class.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch sessions for class ID ${classId}:`, error);
        throw error;
    }
};

export const fetchStudentsByClassId = async (classId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}/students`);
        if (!response.ok) {
            throw new Error('Failed to fetch students for the class.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch students for class ID ${classId}:`, error);
        throw error;
    }
};


export const manageAttendanceForSession = async (sessionId, attendanceData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/sessions/${sessionId}/attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        });

        if (!response.ok) {
            throw new Error('Failed to manage attendance for the session.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to manage attendance for session ID ${sessionId}:`, error);
        throw error;
    }
};


export const fetchClassesForTeacher = async (teacherId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/teacher/${teacherId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch classes for the teacher.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch classes for teacher ID ${teacherId}:`, error);
        throw error;
    }
};

export const fetchClassStats = async (classId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}/stats`, {
            headers: {
                'Cache-Control': 'no-cache'
            }});
        if (!response.ok) {
            throw new Error('Failed to fetch class stats.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch stats for class ID ${classId}:`, error);
        throw error;
    }
};

export const fetchSessionsForTeacher = async (teacherId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/teachers/${teacherId}/sessions`);
        if (!response.ok) {
            throw new Error('Failed to fetch sessions for the teacher.');
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch sessions for teacher ID ${teacherId}:`, error);
        throw error;
    }
};

export const createRepeatingSessions = async (classDetails) => {
    const { classId, room, teacher, startDate, startTime, endTime, repeatCount } = classDetails;
    try {
        const response = await fetch(`${API_BASE_URL}/classes/session-generates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ classId, room, teacher, startDate, startTime, endTime, repeatCount }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create repeating sessions.');
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to create repeating sessions:`, error);
        throw error;
    }
};

export const fetchTeachersByClassId = async (classId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/classes/${classId}/teachers`);
        if (!response.ok) {
            throw new Error('Failed to fetch teachers for the class.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching teachers for class ID ${classId}:`, error);
        throw error;
    }
};
