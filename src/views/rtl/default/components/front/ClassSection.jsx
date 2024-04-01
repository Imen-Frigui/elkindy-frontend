import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import CourseCard from "./CourseCard";
import {fetchTopThreeCourses, fetchCourses} from "../../../../../services/course/courseService";
import ClassCard from "./ClassCard";

const ClassSection = () => {
    const [courses, setCourses] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {

        const getTopThreeCourses = async () => {
            try {
                const topCourses = await fetchTopThreeCourses();
                setCourses(topCourses);
                console.log(topCourses);
            } catch (error) {
                console.error("Error fetching top three courses:", error);
            }
        };
        const fetchAllClasses = async () => {
            const fetchedClasses = await fetchCourses();
            console.log(fetchedClasses.data);
            setClasses(fetchedClasses.data);
        };

        fetchAllClasses();

        getTopThreeCourses();
    }, []);
    return (
        <article className="my-4">
            <div className=" p-10">
                <div className="text-center">
                    <h4 className="text-[#C25934] text-2xl font-medium mb-2"
                        style={{fontFamily: 'Jost'}}>Our Classes</h4>
                    <h2 className="text-[#0C4B65] text-6xl font-medium mb-4"
                        style={{fontFamily: 'Jost'}}>Most Popular Classes</h2>
                    <p className="text-[#0C4B65] text-base font-medium "
                       style={{fontFamily: 'Jost', margin: '0 auto', width: '693.6px'}}>
                        Pellentesque mattis mauris ac tortor volutpat, eu fermentum sapien euismod. In id tempus metus.
                        Donec eu volutpat nibh, in maximus ligula.
                    </p>
                </div>
            </div>
            <div className="flex justify-around mx-10 gap-10 mr-36 ml-36">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course}/>
                ))}
            </div>
            {/*}
           <Link to="#all-courses"
                  className="w-[250px] h-[50px] bg-[#F98100] items-center flex justify-center my-4 px-10 text-white mx-auto"
                  style={{
                      borderRadius: '22px 5px',
                  }}>
                VIEW ALL
            </Link>*/}
            {/*}
            <div className="" id="all-courses">
                <div className="my-4" id="all-courses">
                    <h3 className="text-center text-4xl font-semibold my-6">Choose Your Class</h3>
                    <div className="flex flex-col justify-center">
                        {classes.map((classInfo, index) => (
                            <ClassCard key={index} classInfo={classInfo}/>
                        ))}
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-full mt-4">
                            Read More
                        </button>
                    </div>
                </div>
            </div>*/}
        </article>
    );
};

export default ClassSection;
