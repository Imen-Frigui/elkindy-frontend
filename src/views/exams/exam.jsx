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
import { sendEmail } from '../../services/exam/examService';
import { GiPapers } from "react-icons/gi";
import ExamBanner from "./components/examBanner";
import ExamTimetablePDF from "./components/emploipdf";
import AddExam from './components/add';
import UpdateExam from './components/update';
import { useNavigate } from "react-router-dom";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const ExamsList = () => {
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
    const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
    const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
    const [name, setExamName] = useState('');
    const [startDate, setExamStartDate] = useState('');
    const [startHour, setExamStartHour] = useState('');
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
    const [updatedExamHour, setUpdatedExamHour] = useState('');
    const [selectedExamIdForUpdate, setSelectedExamIdForUpdate] = useState(null);
    const [studentEvaluations, setstudentEvaluations] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermstudent, setSearchTermstudent] = useState("");
    const [grades, setGrades] = useState([]);
    const [filteredgrades, setfilteredGrades] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 5;
    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
  
    // Formater la date dans le format souhaité
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const handleSendEmail = async (c) => {
        try {
            const result = await sendEmail(c);
            if (result) {
                console.log(result);
                setAlertMessage('Email sent successfully');
                alert('Email sent successfully');
            } else {
                setAlertMessage('Failed to send email: ' + result.message);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setAlertMessage('An error occurred while sending email');
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
      };
      
    // Pagination logic
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = filteredExams.slice(
        indexOfFirstEvent,
        indexOfLastEvent
    );

    

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredExams.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    };



    const handlePageNumberClick = (pageNumber) => {
        setCurrentPage(pageNumber);
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


    useEffect(() => {
        

          //getGrades();
          getExams();
          getClasses();
          getTeachers();
        //getEvaluations();
    }, []);

      

    
    const handleUpdateClick = async (e, examId, examData) => {
        e.preventDefault(); // Prevent default form behavior
        const fetchedExams = await fetchExams();
        try {
            const updatedExam = await updateExam(examId, examData);
            console.log('Updated exam:', updatedExam);
            //setExams(updatedExam);
            if (fetchedExams) {
            console.log("farahh")
            // Update the local state of exams immediately after successful update
            setExams(fetchedExams => fetchedExams.map(exam => exam._id === updatedExam._id ? updatedExam : exam));
            getExams();
            }
            // Close the drawer after successful update
            setIsDrawerOpen2(false);
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };
    const handleSubmit = async (e, examId) => {
        e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    
        const examData = {
            name: updatedExamName,
            startDate: updatedExamStartDate,
            duration: updatedExamDuration,
            startHour: updatedExamHour,

            
            classe: updatedExamClass,
            teacher: updatedExamTeacher,
        };
        
    
        try {
            await handleUpdateClick(e, examId, examData);
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
            const examData = { name, startDate, duration, startHour, classe, teacher, type };
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

                <div>
                    <ExamBanner />

                </div>
                <div className="relative  left-[50%] transform -translate-x-1/2 mt-[20px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl  shadow-shadow-700 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[650px] xl:gap-2 flex justify-center mt-20">
                    <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-700 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[650px] xl:gap-2">

                        <div className="flex h-20 items-center rounded-full bg-baground text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[650px]">

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

                            <div class="flex justify-between " className="mt-10 flex justify-between">
                                <div>
                                    <ButtonComponent className="mb-3" text="Add Exam" color="#006BBE" onClick={() => setIsDrawerOpen(true)}>
                                        Add Exam
                                    </ButtonComponent>
                                </div>
                                <div>    <ExamTimetablePDF className="mt-15" exams={exams} /></div>
                                {/* <div>
                                    <ButtonComponent className="mb-3" text="Student Grades" color="#006BBE" onClick={() => setIsDrawerOpen4(true)}>
                                        Show Grades
                                    </ButtonComponent>
                                </div> */}

                            </div>



                            {isDrawerOpen2 && (

                                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md ">
                                    <UpdateExam handleSubmit={handleSubmit} selectedExamIdForUpdate={selectedExamIdForUpdate} handleDrawerClose2={handleDrawerClose2} updatedExamName={updatedExamName} setUpdatedExamName={setUpdatedExamName}  updatedExamStartDate={updatedExamStartDate}setUpdatedExamStartDate={setUpdatedExamStartDate} updatedExamDuration={updatedExamDuration} setUpdatedExamDuration={setUpdatedExamDuration} updatedExamHour={updatedExamHour} setUpdatedExamHour={setUpdatedExamHour} updatedExamClass={updatedExamClass} setUpdatedExamClass={setUpdatedExamClass} updatedExamTeacher={updatedExamTeacher} setUpdatedExamTeacher={setUpdatedExamTeacher} handleDrawerClose={handleDrawerClose}/>
                                     </div>
                            )}


                            {isDrawerOpen && (
                                <div id="drawer-create-course" className="fixed inset-0 flex  justify-center z-50 overflow-auto backdrop-blur-md">

                                    <div class="space-y-2  p-1.5 absolute top-2.5 right-2.5 group  h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200 " onClick={handleDrawerClose}>
                                        <span class="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                                        <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                                    </div>

                                    <AddExam  handleAddExam={handleAddExam} setIsDrawerOpen={setIsDrawerOpen} name={name} setExamName={setExamName} startDate={startDate} setExamStartDate={setExamStartDate} startHour={startHour} setExamStartHour={setExamStartHour} duration={duration} setExamDuration={setExamDuration} classes={classes} setClasses={setClasses}  teachers={teachers} setExamTeachers={setExamTeachers} teacher={teacher}  classe={classe} setExamClass={setExamClass} setExamTeacher={setExamTeacher}/>




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
                                                Start Hour
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
                                        {currentEvents.map(exam => (
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
                                                    <p>{exam.startHour}</p>
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
                                                                    setUpdatedExamHour(exam.startHour);
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

                                                    <div> 
                                                    <ButtonComponent
                                                                text="Send Email"
                                                                onClick={() => {
                                                                    handleSendEmail(exam.classe)
                                                                }}
                                                                color="#F99100"
                                                            />
                                                    </div>
                                                </td>


                                            </tr>
                                           



                                        ))}




                                    </tbody>
                                </table>
                               
                                <div className="mt-4 flex items-center justify-center gap-4">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${currentPage === 1
                                            ? "cursor-not-allowed bg-gray-300"
                                            : "bg-[#f6a12d] hover:bg-blue-500"
                                            }`}
                                    >
                                        <GrFormPreviousLink />
                                        Previous
                                    </button>

                                    {Array.from(
                                        { length: Math.ceil(filteredExams.length / itemsPerPage) },
                                        (_, i) => i + 1
                                    ).map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageNumberClick(pageNumber)}
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${currentPage === pageNumber
                                                ? "bg-blue-500"
                                                : "bg-[#f6a12d] hover:bg-blue-500"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}

                                    <button
                                        onClick={handleNextPage}
                                        disabled={
                                            currentPage === Math.ceil(filteredExams.length / itemsPerPage)
                                        }
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${currentPage === Math.ceil(filteredExams.length / itemsPerPage)
                                            ? "cursor-not-allowed bg-gray-300"
                                            : "bg-[#f6a12d] hover:bg-blue-500"
                                            }`}
                                    >
                                        Next
                                        <GrFormNextLink />
                                    </button>
                                </div>

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


