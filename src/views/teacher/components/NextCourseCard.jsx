import React, { useEffect, useState } from 'react';
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
        <div className="relative max-w-lg mx-auto flex flex-col bg-[#233255] py-3 px-10 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#FDFDF5] mb-4">
                Your Next Course
            </h3>
            <div className="flex items-center justify-between bg-[#F7F5EF] shadow-md rounded-xl p-4 w-full" style={{
                boxShadow: '0px 4px 70px rgba(0, 0, 0, 0.15)',
                borderRadius: '10.6023px',
            }}>

                <div className="flex items-center space-x-3">
                    <div className="bg-red-200 rounded-full p-4">
                        <img src={piano} alt="Piano" className="h-16 w-16"/>
                    </div>

                    <div className="pl-5">
                        <h3 className="text-xl font-bold text-blue-800">{nextSession?.classId?.name}</h3>
                        <p className="text-lg text-blue-800">{courseTime} | Room: {nextSession.room}</p>
                        <p className="text-lg font-bold text-gray-500">{courseDate}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NextCourseCard;
