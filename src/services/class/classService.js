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

// Add to classService.js

// Fetch classes by course ID
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
