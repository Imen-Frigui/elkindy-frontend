import { useEffect, useState } from 'react';
import { fetchCourses, archiveCourse, updateCourse } from '../../services/course/courseService';
import {useNavigate} from "react-router-dom";
import ButtonComponent from "../../components/button/ButtonComponnent";
import AddCourse from "./components/AddCourse";
import ArchivedCourses from "./components/ArchivedCourses";
import TextField from '@mui/material/TextField';
import Banner from "./components/Banner"
import Joyride from 'react-joyride'
const CoursesList = () => {
    const [{ run, steps }, setState] = useState({
        run: true,
        steps: [
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
        ]
    });


    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()



    const [editCourseId, setEditCourseId] = useState(null);
    const [editCourseName, setEditCourseName] = useState('');

    const [joyrideRun, setJoyrideRun] = useState(false);

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
        setJoyrideRun(true);
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

    return (
        <>
            <Banner />
            <div className="flex flex-col mt-6">
                <div className="overflow-x-auto rounded-lg">
                    <div className="inline-block min-w-full align-middle" id="addd" >
                        <AddCourse onCourseAdded={handleCourseAdded}/>

                        <div className="grid grid-cols-12 gap-4">

                            <div className="col-span-9 overflow-hidden shadow sm:rounded-lg mt-4">
                                <table id="table" className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
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
                                            <td id="archive" className="p-4 whitespace-nowrap">
                                                <ButtonComponent
                                                    text="Details"
                                                    onClick={() => navigate(`/admin/courses/assign-teachers/${course._id}`)}
                                                    color="#FB9D37"
                                                />
                                                <ButtonComponent
                                                    text="Archive"
                                                    onClick={() => handleArchiveCourse(course._id)}
                                                    color="red"
                                                />

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-span-3 mt-4"> {/* Archived courses container */}
                                <ArchivedCourses/> {/* Render ArchivedCourses component */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <Joyride continuous
                     callback={() => {}}
                     run={run}
                     steps={steps}
                     hideCloseButton
                     scrollToFirstStep
                     showSkipButton
                     showProgress/>
        </>

    );
};

export default CoursesList;
