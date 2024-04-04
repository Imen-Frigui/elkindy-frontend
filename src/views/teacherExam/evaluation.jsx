import React, { useEffect, useState } from 'react';
import { createExam } from '../../services/exam/examService';
import { createGrade } from '../../services/exam/examService';
import { deleteExam } from '../../services/exam/examService';
import ButtonComponent from "../../components/button/ButtonComponnent";
import { fetchEvalStudent } from '../../services/exam/examService';
import { fetchStudents } from '../../services/exam/examService';
import TeacherBanner from './examBanner.jsx';
import { fetchStudentsExam } from '../../services/exam/examService';
const EvaluationList = () => {

    const [filteredStudents, setFilteredStudents] = useState();
    const [filteredExams, setFilteredExams] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpenAdd, setIsDrawerOpenAdd] = useState(false);
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
    const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
    const [examName, setExamName2] = useState('');
    const [studentName, setstudentName] = useState('');
    const [level, setlevel] = useState('');
    const [grade, setgrade] = useState('');
    const [name, setExamName] = useState('');
    const [startDate, setExamStartDate] = useState('');
    const [startHour, setExamDuration] = useState('');
    const [students, setstudents] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [evaluationClass, setEvaluationClass] = useState([]);
    const [AllClasses, setAllClasses] = useState([]);
    const [username, setUserName] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [grades, setGrades] = useState([]);

    // Formater la date dans le format souhaité
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const getEvaluationClass = async () => {

        try {
            const fetchEvaluations = await fetchStudentsExam();
            if (fetchStudentsExam) {
                console.log(fetchEvaluations);
                setEvaluationClass(fetchEvaluations);
                setFilteredStudents(fetchEvaluations);
                setAllClasses(fetchEvaluations);
            }


        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };

    const handleClose = async () => {
        setIsDrawerOpen2(false)
    }

    const handleClose3 = async () => {
        setIsDrawerOpen3(false)
    }


    const getEvaluations = async (username) => {

        try {
            const fetchEvaluations = await fetchEvalStudent(username);
            if (fetchEvaluations) {
                console.log(fetchEvaluations);
                setEvaluations(fetchEvaluations);

            }


        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };





    useEffect(() => {
        const getStudents = async () => {
            try {
                const fetchstudents = await fetchStudents();
                if (fetchstudents) {
                    console.log(fetchstudents);
                    setstudents(fetchstudents);

                }
            } catch (error) {
                console.error("Failed to fetch evaluations:", error);
            }
        };

        if (username !== '') {
            getEvaluations(username);
        }

        getStudents();
        getEvaluationClass();

    }, [username]);



    const AddGrade = async (event) => {
        event.preventDefault();
        try {

            const type = "evaluation"
            const gradeData = { examName, studentName, grade, level, type };
            console.log(gradeData);
            const newGrade = await createGrade(gradeData);
            console.log('New exam added:', newGrade);

            // Mettre à jour la liste des examens avec le nouvel examen ajouté
            setGrades(grades => [...grades, newGrade]);
            setIsDrawerOpen3(false);
        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };



    const handleAddExam2 = async (examData) => {

        try {
            const newExam = await createExam(examData);
            console.log('New exam added:', newExam);

            // Mettre à jour la liste des examens avec le nouvel examen ajouté
            setEvaluations(evaluations => [...evaluations, newExam]);

            // Mettre à jour la liste filtrée pour refléter les changements
            setFilteredExams(prevFilteredExams => [...prevFilteredExams, newExam]);
        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };








    const handleAddExam = async (event) => {
        event.preventDefault();

        if (searchTerm.trim() !== "") {
            // Empêcher la redirection seulement si le champ de recherche n'est pas vide
            event.preventDefault();
            // Mettre ici le code pour effectuer la recherche ou toute autre action nécessaire
        }
        try {
            const type = "evaluation";
            const teacher = "mohamed";
            const examData = { name, startDate, startHour, teacher, students, type };
            // Utiliser les valeurs correctes des états
            const newExam = await handleAddExam2(examData);
            console.log('New exam added:', newExam);
            // Faire quelque chose avec le nouvel examen ajouté, par exemple actualiser la liste des examens
            setIsDrawerOpen2(false)
        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };


    const handleDeleteExam = async (examId) => {
        try {
            console.log(examId);
            await deleteExam(examId); // Supprimer l'examen
            // Mettre à jour l'état local en retirant l'examen supprimé de la liste
            setEvaluations(evaluations => evaluations.filter(evaluations => evaluations._id !== examId));
            setFilteredExams(evaluations => evaluations.filter(evaluations => evaluations._id !== examId));
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    // const handleSearch = (e) => {
    //     const term = e.target.value;
    //     setSearchTerm(term);
    //     const filtered = exams.filter(exam =>
    //         exam.name.toLowerCase().includes(term.toLowerCase()) ||
    //         exam.startDate.includes(term) ||
    //         exam.duration.toString().includes(term)
    //     );
    //     setFilteredExams(filtered);
    // };

    const handleDrawerClose = () => setIsDrawerOpen(false);



    return (
        <>


            <div>

                <TeacherBanner
                    filteredStudents={filteredStudents}
                    ButtonComponent={ButtonComponent}
                    setIsDrawerOpen2={setIsDrawerOpen2}
                    setstudents={setstudents}
                    setUserName={setUserName}
                    setIsDrawerOpen={setIsDrawerOpen}
                    AllClasses={AllClasses}
                />


            </div>


            {/* <div className="realative" >
                <div className="overflow-hidden shadow sm:rounded-lg mt-4">
            <div className="overflow-hidden overflow-y-auto  max-h-96 ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600  ">
        <thead className="bg-gray-50 dark:bg-gray-700 ">
            <tr>
                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">UserName</th>
                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">PhoneNumber</th>
                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Email</th>
                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Evaluations</th>
            </tr>
        </thead>
        <tbody className="bg-opacity-5 dark:bg-gray-800 max-h-96">
            {filteredStudents.map(student => (
                <tr key={student._id} role="row">
                    <td role="cell" className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                        <p className="font-bold">{student.username}</p>
                    </td>
                    <td role="cell" className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                        <p>{student.phoneNumber}</p>
                    </td>
                    <td role="cell" className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                        <p>{student.email}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                        <ButtonComponent text="Add." color="rgb(12 75 101 / var(--tw-text-opacity))" onClick={() => {
                            setIsDrawerOpen2(true);
                            setstudents(student.username);
                        }}>
                            Add Evaluation
                        </ButtonComponent>
                        <ButtonComponent text="Show" color="#ffd26d" onClick={() => {
                            setUserName(student.username)
                            setIsDrawerOpen(true);
                        }}>
                            Evaluations
                        </ButtonComponent>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div></div> */}





            {isDrawerOpen && (

                <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md mt-6 my-6">
                    <div className="max-w-3xl sm:w-full md:w-3/4 lg:w-1/2 rounded-[20px] mx-auto relative overflow-hidden z-10 bg-lightwhite  p-8 shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                        <img src="https://img.freepik.com/free-photo/close-up-guitarist-hand-playing-guitar-copyspace-macro-shot_155003-42125.jpg?t=st=1712104055~exp=1712107655~hmac=4f7f9d07ef14773a139bdf281a761a6214d1db1c1991b4614939d1a072b63086&w=996" alt="Exam Image" className="w-full rounded-lg mb-6 mt-20" /> {/* Ajoutez la classe mt-4 pour déplacer l'image vers le bas */}
                        <div class="absolute w-24 h-24 bg-kindyyellow rounded-full -z-10 blur-2xl before:w-32 before:h-32 bg-sky-400   top-24 -right-12"></div>
                        <h3 class="text-kindydarkblue pb-2 text-xl font-bold sm:text-2xl">Student : {username} </h3>
                        <span class="bg-kindydarkblue mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
                        <div class="overflow-y-auto max-h-96 overflow-x-hidden px-4 pb-8">


                            <table class="w-full max-w-[550px] border-collapse border border-gray-700 mx-auto">
                                <thead>
                                    <tr>
                                        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Evaluation</th>
                                        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">StartDate</th>
                                        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">StartHour</th>
                                        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Delete</th>
                                        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {evaluations.map((evaluation, index) => (
                                        <tr key={index}>
                                            <td className="p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                                                <p>{evaluation.name}</p>
                                            </td>
                                            <td className="p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                                                <p>{formatDate(evaluation.startDate)}</p>
                                            </td>
                                            <td className="p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                                                <p>{evaluation.startHour}</p>
                                            </td>

                                            <td className="p-4 whitespace-nowrap">
                                                <button
                                                    className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-kindydarkblue bg-red-400 rounded-md group bg-gradient-to-br from-red-400 to-red-300 group-hov:from-red-600 group-hover:to-red-300 hover:text-white dark:text-red-900 focus:ring-4 focus:outline-none focus:ring-red-400 dark:focus:ring-red-700"
                                                    onClick={() => handleDeleteExam(evaluation._id)}
                                                    style={{ borderRadius: '22px 0px' }} // Assurez-vous de définir le style correctement
                                                >
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-200  rounded-2xl group-hover:bg-opacity-0">
                                                        Delete
                                                    </span>
                                                    <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
                                                        <div className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
                                                            <div className="rounded-sm bg-kindydarkblue py-1 px-2">
                                                                <p className="whitespace-nowrap">You Really want To Delete it !!?</p>
                                                            </div>
                                                            <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
                                                        </div>
                                                    </div>
                                                </button>

                                            </td>

                                            <td>
                                                <button
                                                    style={{
                                                        borderRadius: '22px 0px',
                                                        padding: '8px 16px',
                                                        fontSize: '14px',
                                                        minHeight: '36px',
                                                        backgroundColor: '#0C4B65', // kindydarkblue
                                                        color: '#FFFFFF', // blanc
                                                    }}
                                                    className="border border-violet-400 border-b-4 font-medium overflow-hidden relative rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                                                    onClick={() => {
                                                        setIsDrawerOpen3(true);
                                                        setExamName2(evaluation.name);
                                                        setstudentName(evaluation.students[0]);
                                                    }}
                                                >
                                                    <span className="bg-violet-400 shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                                    ADD Grade
                                                </button>


                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-center">
    <button 
        onClick={handleDrawerClose} 
        className="bg-kindydarkblue text-white px-4 py-1 font-semibold rounded-md hover:opacity-100"
        style={{ borderRadius: '22px 0px' }}
    >
        Cancel
    </button>
</div>

                        </div>


                    </div> </div>
            )},


            {isDrawerOpen3 && (
                <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md">
                    <div className="max-w-3xl sm:w-full md:w-4/5 lg:w-3/4 rounded-[20px] mx-auto relative overflow-hidden z-10 bg-kindydarkblue p-8 shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                        <div className="text-gray-50">
                            <span className="font-bold text-5xl">Add Grade</span>
                            <p className="text-sm">Student : {studentName}</p>
                        </div>
                        <form onSubmit={AddGrade}>
                            <div className="flex justify-center">
                            <div className="mb-4 mx-2">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="level">Level :</label>
                                    <input type="text" id="level" value={level} onChange={(e) => setlevel(e.target.value)}
                                        className="mt-1 p-2 w-24 bg-white border-gray-600 rounded-md text-navy-900" // Utilisez la classe "w-24" pour une largeur minimale
                                        name="level"
                                    />
                                </div>


                                <div className="mb-4 mx-2">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="grade">Grade :</label>
                                    <input type="number" id="grade" value={grade} onChange={(e) => setgrade(e.target.value)}
                                        className="mt-1 p-2 w-24 bg-white border-gray-600 rounded-md text-navy-900"
                                        name="grade"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <button type="submit"
                                    className="bg-kindyyellowlight text-black px-6 py-1 font-semibold rounded-md hover:opacity-100"
                                    style={{ borderRadius: '22px 0px' }}
                                    
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-kindyyellow text-black px-4 py-1 font-semibold rounded-md hover:opacity-100" onClick={handleClose3}
                                    style={{ borderRadius: '22px 0px' }}
                                >
                                    Cancel
                                </button>
                            </div>
                            
                        </form>

                        <svg className="absolute -bottom-0.5 -right-20 w-64 h-64 z-10 -my-2 fill-gray-50 stroke-sky-900 opacity: '0.6'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >
                            <path data-name="layer1" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" strokeMiterlimit="10" strokeWidth="5">
                            </path>
                        </svg>

                        <svg className="absolute -bottom-0.5 -right-20 w-64 h-64 z-10 -my-2 fill-gray-50 stroke-sky-700 opacity: '0.6'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path data-name="layer1" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" strokeMiterlimit="10" strokeWidth="2">
                            </path>
                        </svg>

                    </div> </div>
            )}



            {isDrawerOpen2 && (
                <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md">
                    <div className="max-w-md w-96 mx-auto  relative overflow-hidden z-10 bg-baground p-6 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 table-drawer">
                        <h2 className="text-2xl font-bold text-kindydarkblue mb-6">Add Evaluation  <img src="https://img.freepik.com/free-photo/person-practicing-music-home-studio_23-2148924259.jpg?t=st=1712100434~exp=1712104034~hmac=40f86f3f997aef718b9e4ee5fc951033fefb32108e41c6fc45ae4319d7fd1373&w=900" alt="Exam Image" className="w-full rounded-lg mb-6" /></h2>
                        <form onSubmit={handleAddExam}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300" htmlFor="name">Full Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setExamName(e.target.value)}
                                    className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                    name="name"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300" htmlFor="startDate">StartDate</label>
                                <input type="date" id="startDate" value={startDate} onChange={(e) => setExamStartDate(e.target.value)}
                                    className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                    name="startDate"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300" htmlFor="duration">StartHour</label>
                                <input type="time" id="duration" value={startHour} onChange={(e) => setExamDuration(e.target.value)}
                                    className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                    name="duration"
                                />
                            </div>

                            <div className="flex justify-between">

                                <button
                                    className="bg-kindyyellow text-black px-4 py-1 font-semibold rounded-md hover:opacity-100" onClick={handleClose}
                                    style={{ borderRadius: '22px 0px' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-kindyyellowlight text-black px-4 py-1 font-semibold rounded-md hover:opacity-100"
                                    type="submit"
                                    style={{ borderRadius: '22px 0px' }}
                                >
                                    Confirm

                                </button>
                            </div>
                        </form>
                    </div> </div>
            )}




                     





            {/* </div> */}


        </>
    );
};

export default EvaluationList;


