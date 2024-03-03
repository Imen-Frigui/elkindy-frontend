const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`);
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


// In your frontend service file where fetchCourses is defined

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

export const fetchArchivedCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/courses/archived`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch archived courses:", error);
    }
};


