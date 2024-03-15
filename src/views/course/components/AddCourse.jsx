import React, {useEffect, useState} from 'react';
import { addCourse } from '../../../services/course/courseService'
import ButtonComponent from "../../../components/button/ButtonComponnent";



const AddCourse = ({ onCourseAdded }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [isInternship, setIsInternship] = useState(false);

    const [inputValues, setInputValues] = useState({
        courseName: '',
        courseDescription: '',
        courseCategory: '',
        price: 0,
        startDate: '',
        endDate: '',
        isInternship: isInternship,
    });


    const [errors, setErrors] = useState({
        courseName: '',
        courseDescription: '',
        price: ''
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'startDate' || name === 'endDate') {
            const isInternship = inputValues.startDate && inputValues.endDate;
            setIsInternship(isInternship);
            handleInternshipChange({ target: { checked: true } })// Set the checkbox state
            if (isInternship) {
                alert('Setting both start and end dates will categorize this course as an internship.');

            }
        }
    };

    const handleInternshipChange = (e) => {
        setIsInternship(e.target.checked);
    };

    useEffect(() => {
        console.log(errors);
        const { startDate, endDate } = inputValues
        if (startDate && endDate) {
            setIsInternship(true);
            alert('Setting both start and end dates will categorize this course as an internship.');
            handleInternshipChange({ target: { checked: true } })
        } else {
            setIsInternship(false);
            handleInternshipChange({ target: { checked: false } })
        }
    }, [errors, inputValues.startDate, inputValues.endDate, inputValues]);


    const handleDrawerClose = () => setIsDrawerOpen(false);

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { ...errors };

        if (!inputValues.courseName) {
            formIsValid = false;
            newErrors["courseName"] = "Course name is required.";
        }
        if (!inputValues.courseDescription) {
            formIsValid = false;
            newErrors["courseDescription"] = "Description is required.";
        }
        if (!inputValues.price) {
            formIsValid = false;
            newErrors["price"] = "Price is required.";
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleAddCourse = async (event) => {
        event.preventDefault();
        const courseData = {
            title: inputValues.courseName,
            description: inputValues.courseDescription,
            category: inputValues.courseCategory,
            price: inputValues.price,
            startDate: inputValues.startDate,
            endDate: inputValues.endDate,
            isArchived: false,
            isInternship:isInternship
        };
        console.log(courseData)
        if (validateForm()){
            console.log('Form is valid and can be submitted.');
            try{
                await addCourse(courseData);
                onCourseAdded(); // Callback to parent component to update the course list
                handleDrawerClose();

            } catch (error) {
                alert("Failed to add course");
            }
        }else {
            console.log('Form is invalid and cannot be submitted.');
        }

    };

    return (
        <>
            <ButtonComponent className="mb-3 shadow-shadow-900" text="Add Course" color="#0C4B65" onClick={() => setIsDrawerOpen(true)}>
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
                            <input type="text" id="courseName" name="courseName" placeholder="Enter course name"
                                   value={inputValues.courseName}
                                   onChange={handleOnChange}
                                   className={`bg-gray-50 border ${errors.courseName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            />
                            {errors.courseName && (
                                <div className="error-message text-red-500 text-sm mt-1">
                                    {errors.courseName}
                                </div>
                            )}

                        </div>
                        <div>
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="courseDescription" rows="4" name="courseDescription"
                                      placeholder="Enter course description"
                                      value={inputValues.courseDescription}
                                      onChange={handleOnChange}
                                      className={`bg-gray-50 border ${errors.courseDescription ? 'border-red-500' : 'border-gray-300'} block p-2.5 w-full text-sm text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            ></textarea>
                            {errors.courseDescription && (
                                <div className="error-message text-red-500 text-sm mt-1">
                                    {errors.courseDescription}
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="category"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="category" name="courseCategory" placeholder="Select course category"
                                    value={inputValues.courseCategory}
                                    onChange={handleOnChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="Violon Ori">Violon Ori</option>
                                <option value="Initiation">Initiation</option>
                                <option value="Instrument">Instrument</option>
                                <option value="Pinture">Pinture</option>
                                <option value="Danse">Danse</option>
                            </select>

                        </div>
                        <div>
                            <label htmlFor="price"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" id="price" name="price" placeholder="Enter course price"
                                   value={inputValues.price}
                                   onChange={handleOnChange}
                                   className={`bg-gray-50 border ${errors.price ? 'border-red-500' : 'border-gray-300'} w-full p-2.5 text-sm text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600`} />
                            {errors.price && (
                                <div className="error-message text-red-500 text-sm mt-1">
                                    {errors.price}
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="internshipCheckbox" className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="internshipCheckbox"
                                    checked={isInternship}
                                    onChange={handleInternshipChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                />
                                <span
                                    className="text-sm font-medium text-gray-900 dark:text-gray-300">Is Internship</span>
                            </label>
                        </div>

                        {/* Start Date Input */}
                        <div>
                            <label htmlFor="startDate"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                                Date</label>
                            <input type="date" id="startDate" name="startDate"
                                   value={inputValues.startDate}
                                   onChange={handleOnChange}
                                   className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600"/>
                        </div>

                        {/* End Date Input */}
                        <div>
                            <label htmlFor="endDate"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                Date</label>
                            <input type="date" id="endDate" name="endDate"
                                   value={inputValues.endDate}
                                   onChange={handleOnChange}
                                   className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600"/>
                        </div>


                        <button type="submit"
                                className="w-full mt-3 mb-3 text-sm font-medium text-white justify-center bg-[#006BBE] border border-gray-200 rounded-lg px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 hover:bg-[#0C4B65] dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600">Add
                            Course
                        </button>
                        <button onClick={handleDrawerClose}
                                className="w-full text-sm font-medium text-gray-500 justify-center bg-white border border-gray-200 rounded-lg px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600">Cancel
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddCourse;
