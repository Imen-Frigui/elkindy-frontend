import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import SideBar from "./SideBar";
import { fetchCourseById } from "../../../../../services/course/courseService";
import Navbar from "./Navbar";
import violinImage from '../../../../../assets/img/img_1.png';



const CourseDetails = () => {

    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                console.log(`Fetching details for course ID: ${courseId}`);
                const data = await fetchCourseById(courseId);
                setCourse(data);
            } catch (error) {
                console.error("Failed to fetch course details:", error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);


    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar />
            <div className="container mx-auto mt-10 flex">
                <SideBar categories={course.category}/>
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-t-lg overflow-hidden shadow-lg">
                        <img src={course.image || violinImage} alt={course.title || "Course Image"} className="w-full h-auto"/>
                        <div className="p-8">
                            <p className="text-sm font-light text-[#0C4B65] mb-4">
                                In our violin class, students embark on a captivating journey into the world of music
                                through the mastery of one of the most elegant and versatile instruments, the violin.
                                This class is designed to accommodate students of all skill levels, from beginners who
                                have never touched a violin to more advanced players looking to refine their technique
                                and expand their repertoire.
                                {course.title}
                            </p>
                            <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4">
                                <p className="text-lg font-semibold text-[#0C4B65] mb-4">
                                    Students will learn the foundational techniques of violin playing, including proper
                                    posture, bowing technique, hand positioning, and fingering. Through structured
                                    exercises and hands-on instruction, students will develop the muscle memory and
                                    coordination necessary to produce beautiful tones and execute musical passages with
                                    precision.
                                    {course.category}
                                </p>
                            </blockquote>
                            <p className="text-sm font-bold text-[#0C4B65] mb-4">
                                Join us on a transformative musical journey as we discover the beauty and intricacies of
                                the violin together. Whether you're a novice or a seasoned player, our violin class
                                offers a supportive and enriching environment where you can cultivate your passion for
                                music and unleash your artistic potential.
                                {course.description}
                            </p>
                            <p className="text-sm font-bold text-[#0C4B65]">
                                February 11, 2024
                                {course.price}
                            </p>
                        </div>
                    </div>
                    <Link to={`/auth/register/${course._id}`}
                          className="w-[250px] h-[50px] bg-[#F98100] items-center flex justify-center my-4 px-10 text-white mx-auto"
                          style={{
                              borderRadius: '22px 5px',
                          }}>
                        Subscribe to this course
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CourseDetails;
