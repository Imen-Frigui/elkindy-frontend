import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { useEffect, useState } from 'react';
import { fetchClasses, updateClass } from '../../../services/class/classService';
import { fetchTeachers } from '../../../services/user/userService';
const CourseSchedule = ({ courseId }) => {
    const [classEvents, setClassEvents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const loadClassesAndTeachers = async () => {
            const fetchedClasses = await fetchClasses(courseId);
            const fetchedTeachers = await fetchTeachers(); // You need to create this service function

            const events = fetchedClasses.map(classItem => ({
                title: classItem.name,
                start: classItem.startTime,
                end: classItem.endTime,
                resourceId: classItem.teacher, // This assumes you have teacher ID in classItem
            }));
            const resources = fetchedTeachers.map(teacher => ({
                id: teacher._id,
                title: teacher.username,
            }));

            setClassEvents(events);
            setTeachers(resources);
        };
        loadClassesAndTeachers();
    }, [courseId]);

    const handleEventDrop = async (info) => {
        const { event } = info;
        try {
            await updateClass(event.id, {
                startTime: event.start,
                endTime: event.end,
            });
            // Reload classes or update state as necessary
        } catch (error) {
            console.error('Error updating class schedule:', error);
        }
    };

    return (
        <FullCalendar
            plugins={[resourceTimelinePlugin, interactionPlugin]}
            initialView="resourceTimelineDay"
            resources={teachers}
            events={classEvents}
            editable={true}
            droppable={true}
            eventDrop={handleEventDrop}
        />
    );
};

export default CourseSchedule;
