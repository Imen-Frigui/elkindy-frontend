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
