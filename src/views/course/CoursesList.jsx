import { useEffect, useState } from 'react';
import { fetchCourses, addCourse } from '../../services/course/courseService';
import {useNavigate} from "react-router-dom";
import ButtonComponent from "../../components/button/ButtonComponnent";
import AddCourse from "./components/AddCourse";

const CoursesList = () => {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()


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

    const handleCourseAdded = () => {
        fetchCourses().then(setCourses);
    };


    return (
        <>
            <div className="flex flex-col mt-6">
                <div className="overflow-x-auto rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <AddCourse onCourseAdded={handleCourseAdded}/>

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
