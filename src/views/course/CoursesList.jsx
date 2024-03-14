import React, { useEffect, useState } from 'react';
import { fetchCourses, archiveCourse, updateCourse } from '../../services/course/courseService';
import { useNavigate} from "react-router-dom";
import AddCourse from "./components/AddCourse";
import ArchivedCourses from "./components/ArchivedCourses";
import TextField from '@mui/material/TextField';
import TourBanner from "./components/TourBanner"
import Joyride from 'react-joyride'
import StatCard from "./components/StatCard";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArchive, faCheck, faInfoCircle, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const CoursesList = () => {

    const [joyrideRun, setJoyrideRun] = useState(false);
    const [showStatCard, setShowStatCard] = useState(false);
    const [showTourBanner, setShowTourBanner] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);


    const [steps] = useState([
        {
            title: 'Welcome to the Courses Page!',
            target: '#start',
            content: 'This is where you can add a new course.',
            placement: 'bottom',
        },

        {
            title: 'Welcome to the Courses Page!',
            target: '#addd',
            content: 'This is where you can add a new course.',
            placement: 'bottom',
        },
        {
            title: 'Add a Course',
            target: '#archive',
            content: 'Use this to archive a course.',
            placement: 'bottom',
        },
        {
            title: 'Edit a Course',
            target: '#table',
            content: 'Click here to edit an existing course.',
            placement: 'bottom',
         }

    ]);





    const [searchQuery, setSearchQuery] = useState('');

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()


    const [editCourseId, setEditCourseId] = useState(null);
    const [editCourseName, setEditCourseName] = useState('');



    // Start editing a course name
    const handleEditClick = (course) => {
        setEditCourseId(course._id);
        setEditCourseName(course.title);
    };


    const handleSaveClick = async (courseId, newName) => {
        await updateCourse(courseId, { title: newName });
        // Refresh course list
        fetchCourses().then(setCourses);

        // Reset editing state
        setEditCourseId(null);
        setEditCourseName('');
    };


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        fetchCourses(1, pageSize, event.target.value).then(data => {
            setCourses(data.data);
            setTotalPages(data.totalPages);
            setCurrentPage(1); // Reset to first page to see initial results
        });
    };

    useEffect(() => {
        const getCourses = async () => {
            try {
                const fetchedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
                if (fetchedCourses) {
                    setCourses(fetchedCourses.data);
                    setTotalPages(fetchedCourses.totalPages);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        getCourses();
    }, [currentPage, pageSize, searchQuery]);

    const handleCourseAdded = () => {
        fetchCourses().then(setCourses);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleArchiveCourse = async (courseId) => {
        try {
            // Directly call the archiveCourse function imported from courseService
            const response = await archiveCourse(courseId);
            if (response) {
                // Refresh the courses list or update the state to reflect the change
                fetchCourses().then(setCourses);
            } else {
                throw new Error('Failed to archive the course');
            }
        } catch (error) {
            console.error("Failed to archive course:", error);
        }
    };

    const startTour = () => {
        if (!joyrideRun) {
            console.log('Starting tour');
            setJoyrideRun(true);
            setShowTourBanner(false);
        }
    };


    return (
        <>
            {showTourBanner && <TourBanner onStartTour={startTour} />}
            {joyrideRun && !showStatCard && ( <Joyride
                continuous
                run={joyrideRun}
                steps={steps}
                callback={(data) => {
                    console.log('Joyride callback data:', data);

                    const { status } = data;
                    if (status === 'finished' || status === 'skipped') {
                        setJoyrideRun(false);
                        setShowStatCard(true);
                    }
                }}
                hideCloseButton
                scrollToFirstStep
                showSkipButton
                showProgress
            />)}

            <div className="flex flex-col mt-8">
                {showStatCard &&
                    <StatCard title="Students" totalCount={308} stats={{malePercentage: 61, femalePercentage: 39}}/>
                }
                <div className="flex justify-between items-center">
                    {/* Search bar TextField */}
                    <div style={{ backgroundColor: "white", borderRadius: '22px 0px' }} className=" dark:!bg-gray-700 sm:w-fit">
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         style={{
                                             color: '#FB9D37',
                                             fontSize: '20px'
                                         }}
                                         className="mr-6 ml-4 "/>
                    <input type="text"
                        style={{ backgroundColor: "white", borderRadius: '22px 0px' }}
                        id="search-courses"
                        placeholder="Search courses ..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="py-3 px-4 bg-white text-navy-700 shadow-xl ring-kindydarkblue dark:!bg-gray-700 dark:text-white dark:placeholder:!text-white sm:w-fit"
                    />
                    </div>

                    <a href="#!" id="addd">
                        <AddCourse id="start" onCourseAdded={handleCourseAdded}/>
                    </a>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-8">
                    <div className="col-span-9 bg-white mt-4 shadow-md rounded-lg flex flex-col justify-between dark:bg-gray-800">
                        <div className=" overflow-auto  sm:rounded-lg bg-white dark:bg-gray-800">
                        <table id="table" className="p-4 w-full min-w-full min-h-full divide-y divide-gray-200 dark:divide-gray-600">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Title
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Category
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Description
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Price
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                isInternship
                                            </th>
                                            <th scope="col"
                                                className=" text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800">
                                        {Array.isArray(courses) && courses.map(course => (
                                            <tr key={course._id} role="row">
                                            <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                    {editCourseId === course._id ? (
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            defaultValue={course.title}
                                                            value={editCourseName}
                                                            onChange={(e) => setEditCourseName(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleSaveClick(course._id, e.target.value).then(r => console.log(r));
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <p className="font-bold"
                                                           onDoubleClick={() => handleEditClick(course)}>{course.title}</p>
                                                    )}
                                                </td>

                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-400">
                                                    <p>{course.category}</p>
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-400">
                                                    <p>{course.description}</p>
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-400">
                                                    <p>{course.price}</p>
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-white">
                                                    {course.isInternship ? (
                                                        <FontAwesomeIcon icon={faCheck} style={{fontSize: '20px'}}
                                                                         className="text-green-500"/>
                                                    ) : (
                                                        <span>---</span>
                                                    )}
                                                </td>
                                                <td id="archive" className="p-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => navigate(`/admin/courses/assign-teachers/${course._id}`)}
                                                        className="button-with-tooltip">
                                                        <FontAwesomeIcon icon={faInfoCircle}
                                                                         style={{
                                                                             color: '#FB9D37',
                                                                             fontSize: '20px'
                                                                         }}
                                                                         className="mr-6"/>
                                                        <span className="tooltip-text">
                                                        Details
                                                    </span>
                                                    </button>
                                                    <button onClick={() => handleArchiveCourse(course._id)}
                                                            className="button-with-tooltip">
                                                        <FontAwesomeIcon icon={faArchive}
                                                                         style={{color: 'red', fontSize: '20px'}}/>
                                                        <span className="tooltip-text">
                                                        Archive
                                                    </span>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                        <div className="flex justify-center items-center mb-4 mt-4 bg-white dark:bg-gray-800">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-3 py-1 mx-1 rounded text-gray-800 hover:bg-gray-200 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-3 py-1 mx-1 rounded text-gray-800 hover:bg-gray-200 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </div>
                    </div>
                    <div className="col-span-3 mt-4">
                        <ArchivedCourses/>
                    </div>
                </div>


            </div>

        </>

    );
};

export default CoursesList;
