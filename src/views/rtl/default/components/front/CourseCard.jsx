import React from 'react';
import { Link } from 'react-router-dom';
import guitarImage from '../../../../../assets/img/img_1.png';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white mb-4  rounded-lg shadow-md">
            <img src={guitarImage} alt={course.title} className="object-cover" />
            <div className="p-4">
                <h4 className="text-lg font-semibold mb-2 items-center font-body text-[#C25934] ">{course.title}</h4>
                <p className="text-[#0C4B65] text-sm mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                    <div className="flex-col items-center text-indigo-600">
                        <span>{course.duration}</span>
                        <div className="text-indigo-600">{course.price}</div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Link to={`/rtl/course/${course._id}`} className="text-white hover:text-gray-400 text-sm font-semibold rounded-md bg-kindyblue py-2 px-4 transition duration-200">
                            more info
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseCard;
