const API_BASE_URL = 'http://localhost:3000/api/exam';

export const fetchStudents = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/Students`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchEvaluations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/typeEvaluation`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchGrades = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/showgrades`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};



export const fetchEvalStudent = async (userName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/evaluationsStudent/${userName}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchExams = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/typeExams`);
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

export const sendEmail = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sendEmail/${name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
           
        });
        if (response.ok) {
            return { success: true, message: 'Email sent successfully' };
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const createGrade = async (gradeData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/creategrade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gradeData)
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


export const fetchClasses = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/classes/Allclasses`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchTeachers = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/teachers`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchStudentsExam = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/classes/studentsClass/6601738a95f6e1c274e23004`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};

export const fetchClassExams = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/exam/examTeacher/6601738a95f6e1c274e23004`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchStudentClasses = async (name) => {
    try {
        const response = await fetch(`http://localhost:3000/api/classes/StudentsByClass/${name}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
//check Evaluation grade for student 
export const fetchStudentgrades = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/exam/studentEvalgrades/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const updateStudentgrades = async (examData,grade) => {
    try {
        const dataToSend = typeof examData === 'object' ? examData : { id: examData , grade : grade };
        console.log(examData);
        const response = await fetch(`http://localhost:3000/api/exam/updateEvalGrades`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};

//check Exam grade for student 

export const fetchExamsGrades = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/exam/studentgrades/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};