import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import TableEvalution from './examBanner.jsx';
import getEvalGrades from './evaluation.jsx';

const TableEvaluation = ({ filteredStudents, ButtonComponent, setIsDrawerOpen2, setUserName, setIsDrawerOpen ,setstudents , AllClasses }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 5;

    // Pagination logic
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = AllClasses.studentsWithClasses.slice(
        indexOfFirstEvent,
        indexOfLastEvent
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(AllClasses.studentsWithClasses.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    };

    const handlePageNumberClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    console.log(filteredStudents);

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr className="" >
                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">UserName</th>
                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Classes</th>
                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Evaluations</th>
                    </tr>
                </thead>
                <tbody className="bg-opacity-5 dark:bg-gray-800 max-h-96">
                    {currentEvents.map(student => (
                        <tr key={student._id} role="row">
                            <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                                <p className="font-bold">{student.username}</p>
                            </td>
                            <td className="p-4 whitespace-nowrap">
                                <p className="font-bold">{student.classes}</p>
                            </td>
                            <td className="p-4 whitespace-nowrap">
                                <ButtonComponent text="Add." color="rgb(12 75 101 / var(--tw-text-opacity))" onClick={() => {
                                    setIsDrawerOpen2(true);
                                    setstudents(student.username);
                                }}>
                                    Add Evaluation
                                </ButtonComponent>
                                <ButtonComponent  text="Show" color="#ffd26d" onClick={() => {
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
                    { length: Math.ceil(AllClasses.studentsWithClasses.length / itemsPerPage) },
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
                        currentPage === Math.ceil(AllClasses.studentsWithClasses.length / itemsPerPage)
                    }
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${currentPage === Math.ceil(AllClasses.studentsWithClasses.length / itemsPerPage)
                        ? "cursor-not-allowed bg-gray-300"
                        : "bg-[#f6a12d] hover:bg-blue-500"
                        }`}
                >
                    Next
                    <GrFormNextLink />
                </button>
            </div>
        </div>
    );
}

export default TableEvaluation;


