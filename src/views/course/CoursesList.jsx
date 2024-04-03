import React, { useEffect, useState } from 'react';
import {
    fetchCourses,
    archiveCourse,
    updateCourse,
    fetchStudentStats,
    fetchTeacherStats
} from '../../services/course/courseService';
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

    const [studentStats, setStudentStats] = useState(null);
    const [teacherStats, setTeacherStats] = useState(null);


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
            title: 'Archive & Edit Course',
            target: '#archive',
            content: 'Use the red icon to archive ot the orange icon to assign teachers to a course.',
            placement: 'bottom',
        },
        {
            title: 'Edit a Course',
            target: '#table',
            content: 'Feel free to double click on any filed in the table to edit information.',
            placement: 'bottom',
         }

    ]);





    const [searchQuery, setSearchQuery] = useState('');

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()


    const [editCourseId, setEditCourseId] = useState(null);
    const [editCourseName, setEditCourseName] = useState('');

    const [editDescId, setEditDescId] = useState(null);
    const [editDesc, setEditDesc] = useState('');

    const [editPriceId, setEditPriceId] = useState(null);
    const [editPrice, setEditPrice] = useState(0);

    const [editInternshipId, setEditInternshipId] = useState(null);
    const [tempInternshipStatus, setTempInternshipStatus] = useState(false);

    const [editCategoryId, setEditCategoryId] = useState(null);
    const [tempCategory, setTempCategory] = useState('');




    // Start editing a course name
    const handleEditClick = (course) => {
        setEditCourseId(course._id);
        setEditCourseName(course.title);
    };


    const handleSaveClick = async (courseId, newName) => {
        try {
            await updateCourse(courseId, { title: newName });
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);
        } catch (error) {
            console.error("Error updating course Title:", error);
        }
        setEditCourseId(null);
        setEditCourseName('');
    };

    const handleEditDescClick = (course) => {
        setEditDescId(course._id);
        setEditDesc(course.description);
    };

    const handleEditPriceClick = (course) => {
        setEditPriceId(course._id);
        setEditPrice(course.price);
    };


    const handleSaveDescClick = async (courseId, newDesc) => {
        try {
            await updateCourse(courseId, { description: newDesc });
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);
        } catch (error) {
            console.error("Error updating course description:", error);
        }
        setEditDescId(null);
        setEditDesc('');
    };

    const handleSavePriceClick = async (courseId, newPrice) => {
        try {
            await updateCourse(courseId, { price: newPrice });
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);
        } catch (error) {
            console.error("Error updating course price:", error);
        }
        setEditPriceId(null);
        setEditPrice('');
    };


    const handleCategoryChange = (e) => {
        setTempCategory(e.target.value);
    };

    const handleSaveCategory = async (courseId) => {
        try {
            await updateCourse(courseId, { category: tempCategory });
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);
        } catch (error) {
            console.error("Error updating course category:", error);
        }
        setEditCategoryId(null);
        setTempCategory('');
    };

    const categories = ['Violon Ori', 'Initiation', 'Prep', '1er', '2eme', '3eme', '4eme', '5eme', '6eme', 'Diplome', '1ere Adult','2eme Adult','3eme Adult', 'Instrument', 'Peinture', 'Danse', 'Robotique', 'Théâtre'];

    const handleInternshipStatusChange = async (e, course) => {
        setTempInternshipStatus(e.target.checked);
        await handleSaveInternshipStatus(course._id, e.target.checked);
    };

    const handleSaveInternshipStatus = async (courseId, newStatus) => {
        try {
            await updateCourse(courseId, { isInternship: newStatus });
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);
        } catch (error) {
            console.error("Error updating course internship status:", error);
        }
        setEditInternshipId(null);
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
        const getStudentStats = async () => {
            const stats = await fetchStudentStats();
            setStudentStats(stats);
        };

        const getTeacherStats = async () => {
            const stats = await fetchTeacherStats();
            setTeacherStats(stats);
        };

        getStudentStats();
        getTeacherStats();

        getCourses();
    }, [ currentPage, pageSize, searchQuery]);

    const handleCourseAdded = async () => {
        //fetchCourses().then(setCourses);
        try {
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);

        }catch (error) {}

    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleArchiveCourse = async (courseId) => {
        try {
            const response = await archiveCourse(courseId);
            const updatedCourses = await fetchCourses(currentPage, pageSize, searchQuery);
            setCourses(updatedCourses.data);
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
                    <div className="flex flex-row space-x-6 items-center">
                        <StatCard title="Students" totalCount={studentStats?.totalCount} stats={{malePercentage: studentStats?.malePercentage, femalePercentage: studentStats?.femalePercentage
                        }}/>
                        <StatCard title="Teachers" totalCount={teacherStats?.totalCount} stats={{malePercentage: teacherStats?.malePercentage, femalePercentage: teacherStats?.femalePercentage
                        }}/>
                    </div>

                }
                <div className="flex justify-between items-center">
                    {/* Search bar TextField */}
                    <div style={{backgroundColor: "white", borderRadius: '22px 0px'}}
                         className="shadow-xl bg-white dark:!bg-gray-700 sm:w-fit">
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         style={{
                                             color: '#FB9D37',
                                             fontSize: '20px',
                                         }}
                                         className="mr-6 ml-4"/>
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
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-400"
                                                    onDoubleClick={() => {
                                                        setEditCategoryId(course._id);
                                                        setTempCategory(course.category);
                                                    }}>
                                                    {editCategoryId === course._id ? (
                                                        <select value={tempCategory} onChange={handleCategoryChange} onBlur={() => handleSaveCategory(course._id)}>
                                                            {categories.map((category, index) => (
                                                                <option key={index} value={category}>{category}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>{course.category}</p>
                                                    )}

                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-400">
                                                    {editDescId === course._id ? (
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            value={editDesc}
                                                            onChange={(e) => setEditDesc(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleSaveDescClick(course._id, e.target.value);
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <p onDoubleClick={() => handleEditDescClick(course)}>{course.description}</p>
                                                    )}
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-gray-400">
                                                    {editPriceId === course._id ? (
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            value={editPrice}
                                                            onChange={(e) => setEditPrice(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleSavePriceClick(course._id, e.target.value);
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <p onDoubleClick={() => handleEditPriceClick(course)}>{course.price}</p>
                                                    )}
                                                </td>
                                                <td role="cell"
                                                    className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap dark:text-white" onDoubleClick={() => setEditInternshipId(course._id)} >
                                                    {editInternshipId === course._id ? (
                                                        <input
                                                            type="checkbox"
                                                            checked={tempInternshipStatus}
                                                            onChange={(e) => handleInternshipStatusChange(e, course)}
                                                        />
                                                    ) : (
                                                        course.isInternship ? (
                                                            <FontAwesomeIcon icon={faCheck} style={{fontSize: '20px'}} className="text-green-500"/>
                                                        ) : (
                                                            <span>---</span>
                                                        )
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