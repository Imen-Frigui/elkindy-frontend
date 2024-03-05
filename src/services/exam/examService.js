const API_BASE_URL = 'http://localhost:3000/api/exam';

export const fetchExams = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/exams`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const fetchExamById = async (examId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${examId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch exam:", error);
    }
};
export const updateExam = async (examId, examData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/updateExam/${examId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(examData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to update exam:", error);
    }
};
export const deleteExam = async (examId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/deleteExam/${examId}`, {
            method: 'DELETE'
        });
        if (response.ok) {  
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to delete exam:", error);
    }
};

export const createExam = async (examData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/createExam`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(examData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to create exam:", error);
    }
};
