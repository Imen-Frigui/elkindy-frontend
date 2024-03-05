import React, {useEffect, useState} from 'react';
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

    const [errors, setErrors] = useState({
        courseName: '',
        courseDescription: '',
        courseCategory: '',
        price: ''
    });

    useEffect(() => {
        console.log(errors);
    }, [errors]);


    const handleDrawerClose = () => setIsDrawerOpen(false);

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { ...errors };

        if (!courseName) {
            formIsValid = false;
            newErrors["courseName"] = "Course name is required.";
            console.log(newErrors)
        }
        if (!courseCategory) {
            formIsValid = false;
            newErrors["courseCategory"] = "Category is required.";
        }
        if (!courseDescription) {
            formIsValid = false;
            newErrors["courseDescription"] = "courseDescription is required.";
        }
        if (!price) {
            formIsValid = false;
            newErrors["price"] = "Price is required.";
        }


        setErrors(newErrors);
        console.log(newErrors)
        return formIsValid;
    };
    const handleAddCourse = async (event) => {
        event.preventDefault();
        const courseData = {
            title: courseName,
            description: courseDescription,
            category: courseCategory,
            price: parseFloat(price), // Ensure price is a number
            startDate,
            endDate,
            maxStudents: parseInt(maxStudents, 10), // Ensure maxStudents is an integer
            isArchived: false,
        };
        if (validateForm()){
            console.log('Form is valid and can be submitted.');
            try{
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
            }
        }else {
            console.log('Form is invalid and cannot be submitted.');
        }

    };

    return (
        <>
            <ButtonComponent className="mb-3" text="Add Course" color="#006BBE" onClick={() => setIsDrawerOpen(true)}>
                Add course
            </ButtonComponent>
            {isDrawerOpen && (
                <div className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <h5 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Course</h5>
                    <button onClick={handleDrawerClose} className="absolute top-2.5 right-2.5 p-1.5 text-sm text-gray-400 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-200 dark:hover:text-white dark:hover:bg-gray-600">
                        Close
                    </button>
                    <form onSubmit={handleAddCourse}>
                        <div>
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input type="text" id="name" value={courseName}
                                   onChange={(e) => setCourseName(e.target.value)}
                                   className={`bg-gray-50 border ${errors.courseName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            />
                            {errors.courseName && <div className=" error-message text-red-500 text-sm mt-1">{errors.courseName}</div>}
                        </div>
                        <div>
                        <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="4" value={courseDescription}
                                      onChange={(e) => setCourseDescription(e.target.value)}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      ></textarea>
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
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600" required />
                        </div>

                        {/* Start Date Input */}
                        <div>
                            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600" required />
                        </div>

                        {/* End Date Input */}
                        <div>
                            <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600" required />
                        </div>

                        {/* Max Students Input */}
                        <div>
                            <label htmlFor="maxStudents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Students</label>
                            <input type="number" id="maxStudents" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600" required />
                        </div>

                        <button type="submit"  className="w-full mt-3 mb-3 text-sm font-medium text-white justify-center bg-[#006BBE] border border-gray-200 rounded-lg px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 hover:bg-[#0C4B65] dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600">Add Course</button>
                        <button onClick={handleDrawerClose} className="w-full text-sm font-medium text-gray-500 justify-center bg-white border border-gray-200 rounded-lg px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600">Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddCourse;
