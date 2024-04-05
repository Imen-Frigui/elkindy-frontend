import React, { useEffect, useState } from 'react';
import ClassBanner from './classBanner.jsx';
import { fetchClassExams } from '../../services/exam/examService';
import { fetchStudentClasses } from '../../services/exam/examService';
import { useNavigate } from "react-router-dom";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import ButtonComponent from "../../components/button/ButtonComponnent";
import nft1 from "assets/img/nfts/students.jpg";
import { createGrade } from '../../services/exam/examService';

const ExamClass = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filteredExams, setFilteredExams] = useState([]);
    const [filteredStudent, setFilteredStudent] = useState({ students: [] });
    const [students, setStudents] = useState([]);
    const [examName, setExamName] = useState('');
    const [name, setName] = useState();
    const [studentName, setstudentName] = useState('');
    const [level, setlevel] = useState('');
    const [grade, setgrade] = useState('');
    const [grades, setGrades] = useState([]);
    const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
    const getExamClass = async () => {

        try {
            const fetchExams = await fetchClassExams();
            if (fetchExams) {
                console.log(fetchExams);
                setFilteredExams(fetchExams);

            }


        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };


    const getStudentClasses = async () => {
        try {
            const fetchStudents = await fetchStudentClasses(name);
            if (fetchStudents) {
                console.log(fetchStudents);
                setFilteredStudent(fetchStudents);
            }
            
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 5;

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


    useEffect(() => {
        getExamClass();
        getStudentClasses();

    }, [name]);


    const handleClose3 = () => { 
        setIsDrawerOpen3(false);
    }
    
    const AddGrade = async (event) => {
        event.preventDefault();
        try {

            const type = "exam"
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


    return (
        <>
            <div >

                <ClassBanner />


            </div>
            <div>
            <div className="overflow-y-auto max-h-96 overflow-x-hidden px-4 pb-8">
                <table className="w-full max-w-[880px] border-collapse border mt-2 mx-auto">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr >
                            <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">ExamName</th>
                            <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Class</th>
                            <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Actions</th>
                        </tr>
                    </thead>
                  <tbody className="bg-opacity-5 dark:bg-gray-800 max-h-96">
    {currentEvents.map(exam => (
        <tr key={exam._id} role="row">
            <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                <p className="font-bold">{exam.name}</p>
            </td>
            <td className="p-4 whitespace-nowrap pl-4"> {/* Add pl-4 class for left padding */}
                <p className="font-bold">{exam.classe}</p>
            </td>
            <td className="p-4 whitespace-nowrap">
                <ButtonComponent text="Show students" color="#ffd26d" onClick={() => {
                    setIsDrawerOpen(true)
                    setName(exam.classe);
                    setExamName(exam.name)
                }}>
                    Evaluations
                </ButtonComponent>
            </td>
        </tr>
    ))}
</tbody>
                </table>

                </div>
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
            </div>


            {isDrawerOpen && (
    <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md  my-6">
        <div className="max-w-3xl sm:w-full md:w-3/4 lg:w-1/2 mx-auto relative overflow-hidden z-10 bg-white p-2 shadow-md rounded-[20px]">
            <div className="relative">
            <img src={nft1} alt="Exam Image" className="w-full rounded-t-lg mb-6" style={{ maxHeight: '200px', objectFit: 'cover', objectPosition:'50% 60%', filter: 'blur(1px)' }} />



            </div>
            <span className="bg-kindydarkblue mx-auto mb-4 inline-block h-1 w-[90px] rounded absolute bottom-0 left-1/2 transform -translate-x-1/2"></span>

            <div className="overflow-y-auto max-h-96 overflow-x-hidden px-4 pb-8">
    <table className="w-full max-w-[550px] border-collapse border border-gray-700 mx-auto">
        <thead>
            <tr>
                <th className="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Students</th>
                <th className="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">AddGrade</th>
            </tr>
        </thead>
        <tbody >
            {filteredStudent.students.length > 0 ? (
                filteredStudent.students.map((student, index) => (
                    <tr style={{ borderWidth: '2px', borderColor:'black' }} key={index}>
                        <td className="  text-center border-kindydarkblue p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                            <p>{student}</p>
                        </td>
                        <td className=" border-kindydarkblue p-4">
                            <button
                                style={{
                                    borderRadius: '22px 0px',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    minHeight: '36px',
                                    backgroundColor: '#0C4B65', // kindydarkblue
                                    color: '#FFFFFF', // blanc
                                }}
                                className="  ml-14 border-violet-400 border-b-4 font-medium overflow-hidden relative rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                                onClick={() => {
                                    setIsDrawerOpen3(true);
                                    setstudentName(student);
                                }}
                            >
                                <span className="bg-violet-400  shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                ADD Grade
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="2" className="border border-kindydarkblue p-4">No students found</td>
                </tr>
            )}
        </tbody>
    </table>
</div>

        </div>
        <div className="space-y-2 p-1.5 absolute top-2.5 right-2.5 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpen(false)}>
              <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
              <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
              {/* Title */}
              <span className="block text-m text-center mx-5 text-orange-500">Close</span>
            </div>
    </div>
)}



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

                    </div><div className="space-y-2 p-1.5 absolute top-2.5 right-2.5 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpen3(false)}>
              <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
              <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
              {/* Title */}
              <span className="block text-m text-center mx-5 text-orange-500">Close</span>
            </div> </div>
                    
            )}




        </>
    );

}
export default ExamClass;