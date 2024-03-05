import React, { useEffect, useState } from 'react';
import { fetchExams } from '../../services/exam/examService';
import { createExam } from '../../services/exam/examService';
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button/ButtonComponnent";

import { FiSearch } from "react-icons/fi";
const ExamsList = () => {
    const [exams, setExams] = useState([]);
    const {onSearch  } = "props";
    const [filteredExams, setFilteredExams] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [name, setExamName] = useState('');
    const [startDate, setExamStartDate] = useState('');
    const [duration, setExamDuration] = useState('');
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
      };
    useEffect(() => {
        const getExams = async () => {
            try {
                const fetchedExams = await fetchExams();
                if (fetchedExams) {
                    setExams(fetchedExams);
                    setFilteredExams(fetchedExams);
                }
            } catch (error) {
                console.error("Failed to fetch exams:", error);
            }
        };

        getExams();
    }, []);

    const handleAddExam2 = async (examData) => {
        try {
            const newExam = await createExam(examData);
            console.log('New exam added:', newExam);
            
            // Mettre à jour la liste des examens avec le nouvel examen ajouté
            setExams(prevExams => [...prevExams, newExam]);
    
            // Mettre à jour la liste filtrée pour refléter les changements
            setFilteredExams(prevFilteredExams => [...prevFilteredExams, newExam]);
        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };
    
    

    const handleAddExam = async (event) => {
        event.preventDefault();
        try {
            const examData = { name, startDate, duration }; // Utiliser les valeurs correctes des états
            const newExam = await handleAddExam2(examData);
            console.log('New exam added:', newExam);
            // Faire quelque chose avec le nouvel examen ajouté, par exemple actualiser la liste des examens
            handleDrawerClose();
        } catch (error) {
            console.error('Error adding exam:', error);
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

    const handleDrawerClose = () => setIsDrawerOpen(false);

    // const handleAddExam = (event) => {
    //     event.preventDefault();
    //     console.log({ name, startDate, duration });
    //     handleAddExam2(event)
    //     handleDrawerClose();
    // };

    return (
        <>
  <div className="flex flex-col mt-16">
  <div className="absolute top-20 left-[50%] transform -translate-x-1/2 mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[650px] xl:gap-2 flex justify-center mt-20">
    <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[650px] xl:gap-2">
         <p className="pl-3 pr-2 text-xl">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </p>
      <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[650px]">
       
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
                        <ButtonComponent className="mb-3" text="Add Exam" color="#006BBE" onClick={() => setIsDrawerOpen(true)}>
                            Add Exam
                        </ButtonComponent>
                        {isDrawerOpen && (
                          <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-[800px]">
                            <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Exam</h5>
                                <button onClick={handleDrawerClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <span>Close</span>
                                </button>
                                <form onSubmit={handleAddExam}>
    <div className="space-y-4">
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setExamName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <div>
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setExamStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <div>
            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
            <input type="number" id="duration" value={duration} onChange={(e) => setExamDuration(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <button type="submit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Exam</button>
        <button onClick={handleDrawerClose} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
    </div>
</form>
                            </div></div>
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
                                        <td role="cell"
                                            className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            <p>{exam.startDate}</p>
                                        </td>
                                        <td role="cell"
                                            className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            <p>{exam.duration}</p>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <ButtonComponent
                                                text="Details"
                                                onClick={() => navigate(`/admin/exams/${exam._id}`)}
                                                color="#FB9D37"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default ExamsList;


