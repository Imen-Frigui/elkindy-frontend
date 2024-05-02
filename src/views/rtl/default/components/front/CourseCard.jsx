import React from 'react';
import { Link } from 'react-router-dom';
import guitarImage from '../../../../../assets/img/img_1.png';
import { FaDollarSign } from 'react-icons/fa';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white mb-4 rounded-lg shadow-md flex flex-col">
            <img src={course.image || guitarImage} alt={course.title || "Course Image"} className="object-cover"/>
            <div className="p-4 flex flex-col">
                <h4 className="text-lg font-semibold mb-2 text-center font-body text-[#C25934] ">{course.title}</h4>
                <p className="text-[#0C4B65] text-center text-sm mb-4">{course.description}</p>
            </div>
            <div className="p-4 flex justify-between items-center">
                <div className="text-indigo-600 flex items-center">
                    <FaDollarSign className="mr-1"/>
                    {course.price}
                </div>
                <Link to={`/home/course/${course._id}`}
                      className="text-white hover:text-gray-800 hover:bg-indigo-300 text-sm font-semibold rounded-md bg-kindyblue py-2 px-4 transition duration-200">
                    more info
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
