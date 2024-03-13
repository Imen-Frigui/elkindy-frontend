import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Banner from "./Banner";
import { fetchEventById } from "../../../services/event/eventService";
import HistoryCard from "./HistoryCard";

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const eventData = await fetchEventById(eventId);
            setEvent(eventData);
        } catch (error) {
            console.error('Error fetching event details:', error); 
        }
    };

    return (
        <div>
            <Banner />   
            <HistoryCard event={event} /> 
        </div>
        //   {event ? (
        //     <div>
        //         <p>Title: {event.title}</p>
        //         <p>Description: {event.description}</p>
        //         {/* Render other event details */}
        //     </div>
        // ) : (
        //     <p>Loading event details...</p>
        // )}
    );
};

export default EventDetails;
