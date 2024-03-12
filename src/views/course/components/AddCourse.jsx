import React, { useState } from 'react';
import { addCourse } from '../../../services/course/courseService'
import ButtonComponent from "../../../components/button/ButtonComponnent";
const AddCourse = ({ onCourseAdded }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [maxStudents, setMaxStudents] = useState('');

    const handleDrawerClose = () => setIsDrawerOpen(false);

    const handleAddCourse = async (event) => {
        event.preventDefault();
        const courseData = {
            title: courseName,
            description: courseDescription,
            category: courseCategory,
            price,
            startDate,
            endDate,
            maxStudents,
        };

        try {
            await addCourse(courseData);
            onCourseAdded(); // Callback to parent component to update the course list
            handleDrawerClose();
            // Reset form fields
            setCourseName('');
            setCourseDescription('');
            setCourseCategory('');
            setPrice(0);
            setStartDate('');
            setEndDate('');
            setMaxStudents('');
        } catch (error) {
            alert("Failed to add course");
            console.error(error);
        }
    };

    return (
        <>
            <ButtonComponent className="mb-3" text="Add Course" color="#006BBE" onClick={() => setIsDrawerOpen(true)}>
                Add course
            </ButtonComponent>
            {isDrawerOpen && (
                <div id="drawer-create-course"
                     className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none">
                    <h5 id="drawer-label"
                        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New
                        Course</h5>
                    <button onClick={handleDrawerClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <span>Close</span>
                    </button>
                    <form onSubmit={handleAddCourse}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input type="text" id="name" value={courseName}
                                       onChange={(e) => setCourseName(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows="4" value={courseDescription}
                                          onChange={(e) => setCourseDescription(e.target.value)}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          required></textarea>
                            </div>
                            <div>
                                <label htmlFor="category"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" value={courseCategory}
                                        onChange={(e) => setCourseCategory(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="Violon Ori">Violon Ori</option>
                                    <option value="Initiation">Initiation</option>
                                    <option value="Instrument">Instrument</option>
                                    <option value="Pinture">Pinture</option>
                                    <option value="Danse">Danse</option>
                                </select>
                            </div>
                            <button type="submit"
                                    className="inline-flex w-full justify-center mb-2 text-sm font-medium text-gray-900 dark:text-white">Add
                                Course
                            </button>
                            <button onClick={handleDrawerClose}
                                    className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddCourse;
