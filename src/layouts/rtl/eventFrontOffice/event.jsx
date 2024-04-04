import React, { useState, useEffect } from 'react';
import { fetchEvents , searchLocation  } from "../../../services/event/eventService"; 
import HistoryCard from "./HistoryCard";
import { fetchTicketsByEventId } from "../../../services/tickets/ticketService"; 
import { createReservation , participateInEvent} from "../../../services/reservation/reservationService"; 
import MapComponent from './mapcomponent';

const EventCards = () => {
    const [events, setEvent] = useState([]);
    const [locationResults, setLocationResults] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchAllEvents(); 
    }, []);

    const fetchAllEvents = async () => {
        try {
            const eventData = await fetchEvents(); 
              // Fetch tickets for each event
              const eventsWithTickets = await Promise.all(eventData.map(async (event) => {
                const tickets = await fetchTicketsByEventId(event._id);
                return { ...event, tickets }; 
            }));
            setEvent(eventsWithTickets); 
        } catch (error) {
            console.error('Error fetching events:', error); 
        }
    };

    const handleReservationSubmit = async (reservationData) => {
        try {
            const response = await createReservation({...reservationData, event: reservationData.event});
            console.log('Reservation successful:', response);
        } catch (error) {
            console.error('Error making reservation:', error);
        }
    };

    const handleParticipationSubmit = async (participationData) => {
        try {
            const response = await participateInEvent(participationData);
            console.log('Participation successful:', response);
        } catch (error) {
            console.error('Error making participation:', error);
        }
    };

    const fetchLocationData = async (address) => {
        try {
            const data = await searchLocation(address);
            if (data) {
                setSearchResults(data);
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };
    return (
        <div>
           
           <HistoryCard 
            events={events}  
            handleReservationSubmit={handleReservationSubmit} 
            handleParticipationSubmit={handleParticipationSubmit} 
            onLocationSearch={fetchLocationData} 
        />

        {/* MapComponent */}
        <MapComponent 
            center={[34.0000, 9.0000]} 
           zoom={9}       
           searchResults={searchResults}
           setSearchResults={setSearchResults}
        />
         </div>
      
    );
};

export default EventCards;
