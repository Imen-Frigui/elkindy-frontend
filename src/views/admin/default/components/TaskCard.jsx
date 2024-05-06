import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import React, { useEffect, useState } from "react";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { fetchEvents } from '../../../../services/event/eventService'; 


import Card from "components/card";


const TaskCard = () => {

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const allEvents = await fetchEvents(); 
        const sortedEvents = allEvents
          .filter(event => !event.isArchived) 
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); 
        const today = new Date();
        const upcoming = sortedEvents.filter(event => new Date(event.startDate) >= today); 
        setUpcomingEvents(upcoming.slice(0, 4)); 
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    fetchUpcomingEvents();
  }, []);


  return (
    <Card extra="pb-7 h-96 p-[20px]">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <FaCalendarCheck className="h-6 w-6 text-kindydarkblue dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Upcoming Events
          </h4>
        </div>
        <CardMenu />
      </div>

      {/* task content */}
      <div className="h-full w-full">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => (
            <div key={index} className="mt-3 mb-3 space-y-7 flex items-center justify-between p-2">
              <div className="flex items-center justify-center gap-2">
                <Checkbox />
                <p className="text-base font-bold text-navy-700 dark:text-white">
                  {event.title}
                </p>
              </div>
              <div>
                <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming events found.</p>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
