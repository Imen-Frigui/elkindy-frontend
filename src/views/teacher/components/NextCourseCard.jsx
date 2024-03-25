import React, { useEffect, useState } from 'react';
import { VscPiano } from "react-icons/vsc";
import { format } from 'date-fns';
import { fetchNextSessionForTeacher } from "../../../services/class/classService";
import piano from "../../../assets/img/piano.svg";
const NextCourseCard = ({ teacherId }) => {
    const [nextSession, setNextSession] = useState(null);

    useEffect(() => {
        const loadNextSession = async () => {
            try {
                const sessionData = await fetchNextSessionForTeacher(teacherId);
                console.log(sessionData);
                setNextSession(sessionData);
            } catch (error) {
                console.error('Failed to fetch the next session for the teacher:', error);
            }
        };

        if (teacherId) {
            loadNextSession();
        }
    }, [teacherId]);

    if (!nextSession) {
        return <div>Loading next session details...</div>;
    }

    let courseDate, courseTime;
    try {
        courseDate = format(new Date(nextSession.date), 'do MMMM yyyy');
        courseTime = `${format(new Date(nextSession.startTime), 'HH:mm')} - ${format(new Date(nextSession.endTime), 'HH:mm')}`;
    } catch (error) {
        console.error('Error formatting dates:', error);
        courseDate = 'Invalid date';
        courseTime = 'Invalid time';
    }

    return (
        <div
            className="absolute left-[114px] top-[295px] flex h-[202px] w-[527px] flex-col justify-center rounded-xl bg-[#233255] p-4 shadow-lg">
            <h3 className=" left-[129px] mt-1 mb-0.5 top-[315px] w-[160px] h-[29px] text-[20px] font-semibold leading-[29px] text-[#FDFDF5]">
                Your Next Course
            </h3>
            <div
                className="flex mx-auto h-[200px] w-[400px] items-center justify-between rounded-xl bg-[#F7F5EF] pl-9 shadow-md"
                style={{
                    boxShadow: '0px 4px 70px rgba(0, 0, 0, 0.15)',
                    borderRadius: '10.6023px',
                }}
            >
                <div className="flex items-center space-x-3">
                    <div className="flex h-[80px] w-[80px] items-center justify-center rounded-l bg-red-200">
                        <img src={piano} alt="Piano"/>
                    </div>

                    <div className="pl-5">
                        <h3 className="text-xl font-bold text-blue-800">{nextSession.classId.name}</h3>
                        <p className="text-lg text-blue-800">{courseTime} | Room: {nextSession.room}</p>
                        <p className="text-lg font-bold text-gray-500">{courseDate}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NextCourseCard;
