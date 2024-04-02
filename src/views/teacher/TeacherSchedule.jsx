import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { fetchSessionsForTeacher } from '../../services/class/classService';
import axios from "axios";

const TeacherSchedule = () => {
    const [events, setEvents] = useState([]);
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        if (!userData) {
            fetchUserData().then(r => console.log(r, 'userData', userData));
        }
    }, [userData]);


    const teacherId = userData?.user?._id;

    useEffect(() => {
        const loadSessions = async () => {
            const sessions = await fetchSessionsForTeacher(teacherId);
            // Transform sessions into events FullCalendar can use
            const calendarEvents = sessions.map((session) => ({
                title: session.classId.name+ ' - Room: ' + session.room,
                start: session.startTime,
                end: session.endTime,
            }));
            setEvents(calendarEvents);
        };

        if (teacherId) {
            loadSessions();
        }
    }, [teacherId]);

    return (
        <div className="mt-8 bg-[#F7F5EF] p-3  w-full" >
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
