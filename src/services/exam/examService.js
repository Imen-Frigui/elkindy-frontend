import axios from 'axios';

const API_BASE_URL = 'https://elkindy-backend.onrender.com/api/exam';

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

export const createObs = async (obsData) => {
    try {
        console.log("teest",JSON.stringify(obsData));
        const response = await fetch(`http://localhost:3000/api/exam/createObs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obsData)
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


export const fetchStudentsExam = async (id) => {
    try {
        const response = await fetch(`https://elkindy-backend.onrender.com/api/classes/studentsClass/6601738a95f6e1c274e23004`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};

export const fetchClassExams = async (id) => {
    try {
        const response = await fetch(`https://elkindy-backend.onrender.com/api/exam/examTeacher/6601738a95f6e1c274e23004`);
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
export const fetchStudentsgrades = async (id) => {
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
export const fetchStudentsexamsgrades = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/exam/ExamsstudentsGrades/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const fetchStudentgrades = async (id) => {
    try {
        const response = await fetch(`https://elkindy-backend.onrender.com/api/exam/studentgrades/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};


export const fetchNotifications = async (receiverId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications/${receiverId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch exam:", error);
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
export const fetchClassesTeacher = async (id) => {  
    try {
        const response = await fetch(`http://localhost:3000/api/classes/classesTeacher/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};

export const fetchstudentObs = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/api/exam/student/${username}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};

export const teacherUsername = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/exam/teacherName/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};

export const fetchObservations = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/observations/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const predictPerformance = async (formdata) => {
    try {
        const data = {
            "sex": 0,
            "age": 20,
            "who_support_you?": 1,
            "did_you_choose_to_study_music?":formdata.did_you_choose_to_study_music,
            "reason": 3,
            "internet":formdata.internet,
            "romantic":0,
            "do_you_sleep_enough":formdata.do_you_sleep_enough,
            "freetime_per_day":3,
            "Home_practice_hour_perweek": formdata.Home_practice_hour_perweek,
            "health": formdata.health,
            "absences": formdata.absences,
            "Previous_theoretical_exam": formdata.Previous_theoretical_exam,
            "Previous_practice_exam": formdata.Previous_practice_exam,
            "Previous_general_grade": (formdata.Previous_theoretical_exam + formdata.Previous_practice_exam)/2
        };

        const response = await axios.post(`http://127.0.0.1:8050/ai/aipredictstudentperformance`, JSON.stringify(data));
        console.log("succccesss");
        console.log(response.data); // Logging the response data
        
        return response.data; // Returning the response data
    } catch (error) {
        console.error("ERRROOOOOOORRRRRRRRRR:", error);
        throw error; // Re-throwing the error for further handling if needed
    }
};
