import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { fetchSessionsForTeacher } from '../../services/class/classService';
import {fetchUserData} from "../../slices/userSlice";
import Loader from "../../components/button/Loader";
import {useDispatch, useSelector} from "react-redux";


const TeacherSchedule = () => {
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const { userData, isLoading, error } = useSelector((state) => state.user);


    useEffect(() => {
        dispatch(fetchUserData());
        const teacherId = userData?.user?._id;
        const loadSessions = async () => {
            const sessions = await fetchSessionsForTeacher(teacherId);
            console.log(sessions);
            // Transform sessions into events FullCalendar can use
            const calendarEvents = sessions.map((session) => ({
                title: session?.classId?.name+ ' - Room: ' + session.room,
                start: session.startTime,
                end: session.endTime,
            }));
            setEvents(calendarEvents);
        };

        if (teacherId) {
            loadSessions();
        }

    }, [dispatch, userData?.user?._id]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error("Error fetching user data:", error);
        return <div>Error: {error}</div>;
    }




    return (
        <div className="mt-8 bg-[#F7F5EF] p-3  w-full">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek" // 'dayGridMonth', 'timeGridDay'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth'
                }}
                events={events}
                editable={false} // Allows dragging and resizing events
                selectable={true} // Allows selection of timeslots
                selectMirror={true} // Temporary event follows the mouse
                dayMaxEvents={true}// When too many events in a day, show popover
                aspectRatio={1.5}
                contentHeight="500px"
            />
        </div>
    );
};

export default TeacherSchedule;
