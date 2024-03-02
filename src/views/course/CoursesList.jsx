import { useEffect, useState } from 'react';
import { fetchCourses } from '../../services/course/courseService';
import {useNavigate} from "react-router-dom";
import ButtonComponent from "../../components/button/ButtonComponnent";

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCategory, setCourseCategory] = useState('');


    //const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

    const handleAddCourse = (event) => {
        event.preventDefault();
        console.log({ courseName, courseDescription, courseCategory });
        handleDrawerClose();
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

        getCourses().then(r => console.log(r));
    }, []);


    return (
        <>
            <div className="flex flex-col mt-6">
                <div className="overflow-x-auto rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <ButtonComponent className="mb-3" text="Add Course" color="#006BBE" onClick={() => setIsDrawerOpen(true)}>
                            Add course
                        </ButtonComponent>
                        {isDrawerOpen && (
                            <div id="drawer-create-course" className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none">
                                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Course</h5>
                                <button onClick={handleDrawerClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <span>Close</span>
                                </button>
                                <form onSubmit={handleAddCourse}>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input type="text" id="name" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <textarea id="description" rows="4" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                            <select id="category" value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option value="Violon Ori">Violon Ori</option>
                                                <option value="Initiation">Initiation</option>
                                                <option value="Instrument">Instrument</option>
                                                <option value="Pinture">Pinture</option>
                                                <option value="Danse">Danse</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Course</button>
                                        <button onClick={handleDrawerClose} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        )}


                        <div className="overflow-hidden shadow sm:rounded-lg mt-4">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
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
                                            <p className="font-bold">{course.title}</p>
                                        </td>
                                        <td role="cell"
                                            className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            <p>{course.category}</p>
                                        </td>
                                        <td role="cell"
                                            className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            <p>{course.description}</p>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <ButtonComponent
                                                text="Details"
                                                onClick={() => navigate(`/admin/courses/assign-teachers/${course._id}`)}
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


            {/*
            <div
                className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none w-full h-full px-6 pb-6 sm:overflow-x-auto">
                <div className="relative flex items-center justify-between pt-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">Course Tables
                        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
                            <table role="table" className="w-full">
                                <thead>
                                <tr role="row">
                                    <th role="columnheader"
                                        className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                                        <p className="text-xs tracking-wide text-gray-600">Name</p>
                                    </th>
                                    <th role="columnheader"
                                        className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                                        <p className="text-xs tracking-wide text-gray-600">Category</p>
                                    </th>
                                    <th role="columnheader"
                                        className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                                        <p className="text-xs tracking-wide text-gray-600">description</p>
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map(course => (
                                    <tr key={course._id} role="row">
                                        <td role="cell" className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{course.title}</p>
                                        </td>
                                        <td role="cell" className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{course.category}</p>
                                        </td>
                                        <td role="cell" className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{course.description}</p>
                                        </td>
                                        <td>
                                            <ButtonComponent
                                                text="Assign Teachers"
                                                onClick={() => navigate(`/admin/courses/assign-teachers/${course._id}`)}
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
            */}
        </>

    );
};

export default CoursesList;
