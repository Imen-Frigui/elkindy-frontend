import { useEffect, useState } from 'react';
import { fetchCourses, archiveCourse, updateCourse } from '../../services/course/courseService';
import { useNavigate} from "react-router-dom";
import AddCourse from "./components/AddCourse";
import ArchivedCourses from "./components/ArchivedCourses";
import TextField from '@mui/material/TextField';
import TourBanner from "./components/TourBanner"
import Joyride from 'react-joyride'
import StatCard from "./components/StatCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArchive, faCheck, faInfoCircle} from '@fortawesome/free-solid-svg-icons';


const CoursesList = () => {

    const [joyrideRun, setJoyrideRun] = useState(false);
    const [showStatCard, setShowStatCard] = useState(false);
    const [showTourBanner, setShowTourBanner] = useState(true);


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

    useEffect(() => {
        const getCourses = async () => {
            try {
                const fetchedCourses = await fetchCourses();
                if (fetchedCourses) {
                    setCourses(fetchedCourses);
                    console.log(fetchedCourses);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        getCourses();
    }, []);

    const handleCourseAdded = () => {
        fetchCourses().then(setCourses);
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
                {showStatCard && <StatCard />}
                <div className="table-responsive overflow-x-auto rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <a href="#!" id="addd"  >
                            <AddCourse id="start" onCourseAdded={handleCourseAdded}/>
                        </a>


                        <div className="grid lg:grid-cols-12 md:grid-rows-2f gap-4 mb-3">
                            <div className="col-span-9 overflow-auto shadow sm:rounded-lg mt-4">
                                <table id="table" className="min-w-full min-h-full divide-y divide-gray-200 dark:divide-gray-600">
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
                                            isInternship
                                        </th>
                                        <th scope="col"
                                            className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800">
                                    {courses.map(course => (
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
                                                className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                <p>{course.category}</p>
                                            </td>
                                            <td role="cell"
                                                className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                <p>{course.description}</p>
                                            </td>
                                            <td role="cell"
                                                className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                {course.isInternship ? (
                                                    <FontAwesomeIcon icon={faCheck} style={{fontSize:'20px'}} className="text-green-500" />
                                                ) : (
                                                    <span>---</span>
                                                )}
                                            </td>
                                            <td id="archive" className="p-4 whitespace-nowrap">
                                                <button onClick={() => navigate(`/admin/courses/assign-teachers/${course._id}`)} className="button-with-tooltip">
                                                    <FontAwesomeIcon icon={faInfoCircle} style={{color: '#FB9D37', fontSize:'20px'}} className="mr-6"/>
                                                    <span className="tooltip-text">
                                                        Details
                                                    </span>
                                                </button>
                                                <button onClick={() => handleArchiveCourse(course._id)} className="button-with-tooltip">
                                                    <FontAwesomeIcon icon={faArchive} style={{color: 'red', fontSize:'20px'}}/>
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

                            <div className="col-span-3 mt-4">
                                <ArchivedCourses/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>

    );
};

export default CoursesList;
