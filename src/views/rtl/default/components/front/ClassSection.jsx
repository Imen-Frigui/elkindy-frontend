import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import CourseCard from "./CourseCard";
import {fetchTopThreeCourses} from "../../../../../services/course/courseService";

const ClassSection = () => {
    const [courses, setCourses] = useState([]);

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

*            <Link to="/classes"
                  className="w-[250px] h-[50px] bg-[#F98100] items-center flex justify-center my-4 px-10 text-white mx-auto"
                  style={{
                      borderRadius: '22px 5px',
                  }}>
                VIEW ALL
            </Link>
        </article>
    );
};

export default ClassSection;
