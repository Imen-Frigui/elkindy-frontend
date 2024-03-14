import React, { useEffect, useState } from 'react';
import { fetchExams } from '../../services/exam/examService';
import { createExam } from '../../services/exam/examService';
import { deleteExam } from '../../services/exam/examService';
import { updateExam } from '../../services/exam/examService';
import ButtonComponent from "../../components/button/ButtonComponnent";
import { fetchClasses } from '../../services/exam/examService';
import { fetchTeachers } from '../../services/exam/examService';
import { fetchEvalStudent } from '../../services/exam/examService';
import { FiSearch } from "react-icons/fi";
import { fetchGrades } from '../../services/exam/examService';
import { GiPapers } from "react-icons/gi";
const ExamsList = () => {
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
    const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
    const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
    const [name, setExamName] = useState('');
    const [startDate, setExamStartDate] = useState('');
    const [duration, setExamDuration] = useState('');
    const [classe, setExamClass] = useState('');
    const [teacher, setExamTeacher] = useState('');
    const [teachers, setExamTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [updatedExamName, setUpdatedExamName] = useState('');
    const [updatedExamStartDate, setUpdatedExamStartDate] = useState('');
    const [updatedExamDuration, setUpdatedExamDuration] = useState('');
    const [updatedExamClass, setUpdatedExamClass] = useState('');
    const [updatedExamTeacher, setUpdatedExamTeacher] = useState('');
    const [selectedExamIdForUpdate, setSelectedExamIdForUpdate] = useState(null);
    const [studentEvaluations, setstudentEvaluations] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermstudent, setSearchTermstudent] = useState("");
    const [grades, setGrades] = useState([]);
    const [filteredgrades, setfilteredGrades] = useState([]);
    const [studentName, setstudentName] = useState();
    const [grade, setgrade] = useState();
    const [level, setLevel] = useState();
    // Formater la date dans le format souhaité
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };


    const getEvaluations = async () => {
        try {
            const fetchexams = await fetchEvalStudent();
            if (fetchexams) {
                console.log(fetchexams);
                setstudentEvaluations(fetchexams);

            }


        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        }
    };

    const getGrades = async () => {
        try {
            const fetgrades = await fetchGrades();
            if (fetgrades) {
                console.log(fetgrades);
                setGrades(fetgrades);
                setfilteredGrades(fetgrades);

            }


        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        }
    };



    const getTeachers = async () => {
        try {
            const fetchTteachers = await fetchTeachers();
            if (fetchTteachers) {
                console.log(fetchTteachers);
                setExamTeachers(fetchTteachers);

            }


        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        }
    };


    const getClasses = async () => {
        try {
            const fetchClass = await fetchClasses();
            if (fetchClass) {
                console.log(fetchClass);
                setClasses(fetchClass);

            }


        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
    const options = classes;




    useEffect(() => {
        const getExams = async () => {
            try {
                const fetchedExams = await fetchExams();
                if (fetchedExams) {
                    console.log(fetchedExams);
                    setExams(fetchedExams);
                    setFilteredExams(fetchedExams);
                }
            } catch (error) {
                console.error("Failed to fetch exams:", error);
            }
        };

        getGrades();
        getExams();
        getClasses();
        getTeachers();
        getEvaluations();
    }, []);
    const handleUpdateClick = async (e, examId, exxx) => {
        //  e.preventDefault(); // Empêcher le comportement par défaut du formulaire
        setIsDrawerOpen2(true);
        setSelectedExamIdForUpdate(examId);
        const examData = {
            name: updatedExamName,
            startDate: updatedExamStartDate,
            duration: updatedExamDuration,
            classe: updatedExamClass,
            teacher: updatedExamTeacher
        };

        try {
            const updatedExam = await updateExam(examId, examData);
            console.log('Updated exam:', updatedExam);

            // Mettre à jour l'état local ou effectuer toute autre action nécessaire après la mise à jour réussie
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    const handleSubmit = async (e, examId, exam) => {
        //  e.preventDefault();

        const examData = {
            name: updatedExamName,
            startDate: updatedExamStartDate,
            duration: updatedExamDuration,
            classe: updatedExamClass,
            teacher: updatedExamTeacher
        };

        try {
            await handleUpdateClick(e, examId, examData);
            setIsDrawerOpen2(false); // Fermer le tiroir après la soumission réussie
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };


    const handleAddExam2 = async (examData) => {
        try {
            const newExam = await createExam(examData);
            console.log('New exam added:', newExam);

            // Mettre à jour la liste des examens avec le nouvel examen ajouté
            setExams(exams => [...exams, newExam]);

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
            //event.preventDefault();
            // Mettre ici le code pour effectuer la recherche ou toute autre action nécessaire
        }
        try {
            const type = "exam";
            const examData = { name, startDate, duration, classe, teacher, type };
            // Utiliser les valeurs correctes des états
            const newExam = await handleAddExam2(examData);
            console.log('New exam added:', newExam);
            // Faire quelque chose avec le nouvel examen ajouté, par exemple actualiser la liste des examens
            handleDrawerClose();
        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };


    const handleDeleteExam = async (examId) => {
        try {
            console.log(examId);
            await deleteExam(examId); // Supprimer l'examen
            // Mettre à jour l'état local en retirant l'examen supprimé de la liste
            setExams(prevExams => prevExams.filter(exam => exam._id !== examId));
            setFilteredExams(prevExams => prevExams.filter(exam => exam._id !== examId));
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = exams.filter(exam =>
            exam.name.toLowerCase().includes(term.toLowerCase()) ||
            exam.startDate.includes(term) ||
            exam.duration.toString().includes(term)
        );
        setFilteredExams(filtered);
    };
    const handleSearchstudent = (e) => {
        const term = e.target.value;
        setSearchTermstudent(term);
        const filtered = grades.filter(grade =>
            grade.studentName.toLowerCase().includes(term.toLowerCase())
          
        );
        setfilteredGrades(filtered);
    };

    const handleDrawerClose = () => setIsDrawerOpen(false);
    const handleDrawerClose2 = () => setIsDrawerOpen2(false);
    const handleDrawerClose3 = () => setIsDrawerOpen3(false);
    const handleDrawerClose4 = () => setIsDrawerOpen4(false);
    return (
        <>
            <div className="flex flex-col mt-16">
                <div className="absolute top-20 left-[50%] transform -translate-x-1/2 mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[650px] xl:gap-2 flex justify-center mt-20">
                    <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[650px] xl:gap-2">

                        <div className="flex h-full items-center rounded-full bg-baground text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[650px]">

                            <GiPapers className="h-4 w-4 text-gray-400 dark:text-white" />

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="block h-full w-full rounded-full bg-baground text-sm font-medium text-navy-700 outline-none placeholder-gray-400 xl:w-[650px] dark:placeholder-white sm:w-fit focus:bg-gray-50  focus:text-black"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="overflow-x-auto rounded-lg">
                        <div className="inline-block min-w-full align-middle">

                            <div class="flex justify-between ">
                                <div>
                                    <ButtonComponent className="mb-3" text="Add Exam" color="#006BBE" onClick={() => setIsDrawerOpen(true)}>
                                        Add Exam
                                    </ButtonComponent>
                                </div>

                                <div>
                                    <ButtonComponent className="mb-3" text="Student Grades" color="#006BBE" onClick={() => setIsDrawerOpen4(true)}>
                                        Show Grades
                                    </ButtonComponent>
                                </div>

                            </div>



                            {isDrawerOpen2 && (

                                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md ">
                                    <div className="flex items-center mb-6 ">
                                        <div className="max-w-md w-96 mx-auto  relative overflow-hidden z-10 bg-white p-6 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 table-drawer">
                                            <h2 className="text-2xl font-bold text-kindydarkblue mb-6">Update Exam  <img src="https://img.freepik.com/premium-vector/hand-drawn-headphones-music-notes-realistic-notebook-page_53562-7929.jpg?w=740" alt="Exam Image" className="w-full rounded-lg mb-6" /></h2>
                                        </div>
                                        <form onSubmit={(e) => handleSubmit(e, selectedExamIdForUpdate)}>
                                            <div className="mb-4" >
                                                <div
                                                    class="group flex h-0 w-0 cursor-pointer items-center justify-center rounded-3xl  p-2 hover:bg-slate-200"
                                                    onClick={handleDrawerClose2}
                                                >
                                                    <div class="space-y-2  p-1.5 absolute top-2.5 right-2.5 ">
                                                        <span class="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                                                        <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                                                    </div>

                                                </div>
                                                <div className="max-w-md w-full mx-auto -my-16 px-4 relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 table-drawer">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                        <div className="mb-4 flex flex-col">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedName">Updated Name</label>
                                                            <input type="text" id="updatedName" value={updatedExamName} onChange={(e) => setUpdatedExamName(e.target.value)} className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue" name="updatedName" />
                                                        </div>



                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedStartDate">Updated Start Date</label>
                                                            <input type="date" id="updatedStartDate" value={updatedExamStartDate} onChange={(e) => setUpdatedExamStartDate(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedStartDate"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedDuration">Updated Duration</label>
                                                            <input type="text" id="updatedDuration" value={updatedExamDuration} onChange={(e) => setUpdatedExamDuration(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedDuration"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedClass">Updated Class</label>
                                                            <input type="text" id="updatedClass" value={updatedExamClass} onChange={(e) => setUpdatedExamClass(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedClass"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedTeacher">Updated Teacher</label>
                                                            <input type="text" id="updatedTeacher" value={updatedExamTeacher} onChange={(e) => setUpdatedExamTeacher(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedTeacher"
                                                            />
                                                        </div>

                                                        <div class="flex justify-end">
                                                            <button onClick={handleDrawerClose}
                                                                class="bg-kindyyellowlight text-black px-2 py-1 font-semibold rounded-md hover:opacity-100 w-20 h-10" type="submit"
                                                                style={{ borderRadius: '22px 0px' }}
                                                            >
                                                                Update
                                                            </button>
                                                        </div>
                                                    </div></div>

                                            </div>
                                        </form>
                                    </div> </div>
                            )}


                            {isDrawerOpen && (
                                <div id="drawer-create-course" className="fixed inset-0 flex  justify-center z-50 overflow-auto backdrop-blur-md">
                                  
                                            <div class="space-y-2  p-1.5 absolute top-2.5 right-2.5 group  h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200 " onClick={handleDrawerClose}>
                                                <span class="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                                                <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                                            </div>
                                        
                                    <div className="  dark:bg-gray-800 ">
                                    <div className=" mt-6 max-w-md w-96 mx-auto  relative overflow-hidden z-10 bg-white p-6 rounded-lg shadow-md before:w-24 before:h-20 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-12 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-10 table-drawer mb-6">
                                                                             <h2 className="text-2xl font-bold text-kindydarkblue  ml-24">Add an Exam   </h2>
                                        </div>
                                        <div className=" bg-white p-4 rounded-lg shadow-lg w-[500px]">
                                        <img src="https://img.freepik.com/free-photo/pencil-mpty-pages-sheet-music_23-2147846239.jpg?t=st=1710294895~exp=1710298495~hmac=fab9842d293a30e7d4392c280c4701bc1a0cd7e274cd6299130a43e08b202d5c&w=996" alt="Exam Image" className="w-full rounded-lg mb-2 top-14" />
                                        {/* <button onClick={handleDrawerClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                            <span>Close</span>
                                        </button> */}
                                       



                                        <form onSubmit={handleAddExam}>
                                            <div className="space-y-2">

                                                <div class="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl">
                                                    <input type="text" id="name" value={name} onChange={(e) => setExamName(e.target.value)} placeholder="Exam Name"
                                                        class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-black-50" />

                                                </div>



                                                <div>
                                                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                                    <input type="date" id="startDate" value={startDate} onChange={(e) => setExamStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (hh:mm)</label>
                                                    <input
                                                        type="text"
                                                        id="duration"
                                                        value={duration}
                                                        onChange={(e) => setExamDuration(e.target.value)}
                                                        placeholder="hh:mm"
                                                        pattern="[0-9]{1,2}:[0-5][0-9]"
                                                        title="Enter a valid duration in the format hh:mm (e.g., 01:30)"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        required
                                                    />
                                                </div>





                                                <div class="flex flex-row items-end">
                                                    <label htmlFor="class" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose The Class  :</label>
                                                    <select id="class" value={classe} onChange={(e) => setExamClass(e.target.value)} class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" style={{ marginLeft: '8px' }}>
                                                        <option value="All classes">All Classes</option>
                                                        {options.map((classe) => (
                                                            <option key={classe} value={classe.name}>
                                                                {classe.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="class">

                                                        </ul>
                                                    </div>

                                                </div>


                                                <div class="flex flex-row items-end">
                                                    <label htmlFor="teacher" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose The Teacher  :</label>
                                                    <select id="teacher" value={teacher} onChange={(e) => setExamTeacher(e.target.value)} class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" style={{ marginLeft: '8px' }}>
                                                        <option value="All classes">All Teachers</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher} value={teacher.username}>
                                                                {teacher.username}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="class">

                                                        </ul>
                                                    </div>

                                                </div>

                                                <ButtonComponent type="submit" text="Confirm" color="#0D6BBE"
                                                >
                                                    Update
                                                </ButtonComponent>
                                                {/* <button onClick={handleDrawerClose} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button> */}
                                                <div class="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl  p-2 hover:bg-slate-200">

                                                    <button onClick={handleDrawerClose} className="ml-4 inline-flex justify-center items-center text-gray-500 bg-kindyyellowlight hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-navy-900 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                                </div>

                                            </div>
                                        </form>
                                    </div></div>
                                    </div>
                            )}

                            {isDrawerOpen4 && (
                                <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md">
                                 <div className="container mx-auto max-w-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3"> 
                                                                             <div className="max-w-md w-96 mx-auto  relative overflow-hidden z-10 bg-white p-6 rounded-lg shadow-md before:w-24 before:h-20 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-12 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-10 table-drawer mb-6">
                                                                             <h2 className="text-2xl font-bold text-kindydarkblue  ml-16">Find Your Student   </h2>
                                        </div>
 
                                     <div className=" top-10  mb-[10px] mt-[2px]  h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[450px] xl:gap-2 flex justify-center mt-20">
                                     <div className=" mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[350px] xl:gap-2">

                        <div className="flex h-full items-center rounded-full bg-white text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[450px]">

                            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTermstudent}
                                onChange={handleSearchstudent}
                                className="block h-full w-full rounded-full bg-white text-sm font-medium text-navy-700 outline-none placeholder-gray-400 xl:w-[650px] dark:placeholder-white sm:w-fit   focus:text-black"
                            />
                        </div>
                    </div>
                </div>
                                        <div className="grid grid-cols-2 gap-6 overflow-y-auto max-h-96">
                                            {filteredgrades.map((grade, index) => (
                                                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                                                    <h2 className="text-xl text-kindydarkblue  font-semibold mb-2">{grade.studentName}</h2>
                                                    <p className="text-gray-600">{`Level: ${grade.level}, Grade: ${grade.grade}, Type: ${grade.type} `}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div class="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200">

                                            <button onClick={handleDrawerClose4} className="ml-4 inline-flex justify-center items-center text-kindydarkblue bg-kindyyellowlight hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-kindydarkblue dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                        </div>
                                    </div>


                                </div>

                            )}

                            <div className="overflow-hidden shadow sm:rounded-lg mt-4">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Name
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Start Date
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Duration
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Class
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Teacher
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800">
                                        {filteredExams.map(exam => (
                                            <tr key={exam._id} role="row">
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                    <p className="font-bold">{exam.name}</p>
                                                </td>
                                                <td role="cell" className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    <p>{formatDate(exam.startDate)}</p>
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    <p>{exam.duration}</p>
                                                </td>

                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    <p>{exam.classe}</p>
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    <p>{exam.teacher}</p>
                                                </td>


                                                <td className="p-4">
    <div className="flex items-center">
        <div className="mr-4">
            <ButtonComponent
                text="Update"
                color="#ffd26d"
                onClick={() => {
                    setIsDrawerOpen2(true);
                    setSelectedExamIdForUpdate(exam._id);
                    setUpdatedExamName(exam.name);
                    setUpdatedExamStartDate(exam.startDate);
                    setUpdatedExamDuration(exam.duration);
                    setUpdatedExamClass(exam.classe);
                    setUpdatedExamTeacher(exam.teacher);
                }}
            />
        </div>
        <div>
            <ButtonComponent
                text="Delete"
                onClick={() => {
                    setIsDrawerOpen3(true)
                    setSelectedExamIdForUpdate(exam._id)
                }}
                color="#F98100"
            />
        </div>
    </div>
</td>


                                            </tr>




                                        ))}




                                    </tbody>
                                </table>



                                {isDrawerOpen3 && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md ">
                                        <div
                                            class=" group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-white border border-gray-800 shadow-lg rounded-2xl  inset-0  z-50 overflow-auto backdrop-blur-md"
                                        >
                                            <div class="">
                                                <div class="text-center p-3 flex-auto justify-center">
                                                    <svg
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        class="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-kindyorange mx-auto"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            clip-rule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            fill-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <h2 class="text-xl font-bold py-4 text-navy-900">Are you sure?</h2>
                                                    <p class="font-bold text-sm text-navy-900 px-2">
                                                        Do you really want to continue ? This process cannot be undone
                                                    </p>
                                                </div>
                                                <div class="p-2 mt-2 text-center space-x-1 md:block">
                                                    <button onClick={handleDrawerClose3}
                                                        class=" mb-2 md:mb-0 bg-kindyblue px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button onClick={() => {
                                                        handleDeleteExam(selectedExamIdForUpdate)
                                                        setIsDrawerOpen3(false)
                                                    }}
                                                        class="bg-kindyorange hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-kindyorange hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div></div>

                                )},

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamsList;


