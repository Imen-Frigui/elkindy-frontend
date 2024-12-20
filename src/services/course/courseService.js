const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCourses = async (page = 1, pageSize = 10, searchQuery = '', isInternship ='false') => {
    const query = new URLSearchParams({ page, pageSize, searchQuery, isInternship }).toString();
    try {
        const response = await fetch(`${API_BASE_URL}/courses?${query}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const fetchCourseById = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch course:", error);
    }
};
export const updateCourse = async (courseId, courseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to update course:", error);
    }
};

export const addCourse = async (courseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to add course:", error);
    }
};


export const deleteCourse = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to delete course:", error);
    }
};

export const archiveCourse = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/archive/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers as required, like authorization tokens
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to archive the course');
        }
    } catch (error) {
        console.error("Failed to archive course:", error);
    }
};

export const fetchArchivedCourses = async (page = 1, pageSize = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/arch/archived?page=${page}&pageSize=${pageSize}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch archived courses:", error);
    }
};

export const updateCourseTeachers = async (courseId, teacherIds) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/details/${courseId}/teachers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherIds),
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to update course teachers:", error);
        throw error;
    }
};

export const fetchAssignedTeachers = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/details/${courseId}/teachers`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.assignedTeachers;
    } catch (error) {
        console.error("Failed to fetch assigned teachers:", error);
    }
};

export const fetchTopThreeCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/popular`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch top three courses:", error);
        throw error;
    }
};

export const fetchStudentStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/students-stats`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch student stats:", error);
        throw error;
    }
};

export const fetchTeacherStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/teachers-stats`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch teacher stats:", error);
        throw error;
    }
};

export const uploadCourseImage = async (courseId, file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/upload-image`, {
            method: 'PATCH',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to upload course image:", error);
        throw error;
    }
};

export const fetchInstrument = async (searchTerm) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/instruments?searchTerm=${searchTerm}`);
        if (!response.ok) {
            throw new Error('Failed to fetch instruments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching instruments:', error);
        return [];
    }
};

export const fetchInstrumentPopularity = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/instruments/popularity`);
        if (!response.ok) {
            throw new Error('Failed to fetch instrument popularity data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching instrument popularity:', error);
        return {};
    }
};
