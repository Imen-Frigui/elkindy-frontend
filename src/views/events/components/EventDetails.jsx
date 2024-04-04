import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Banner from "./Banner";
import { fetchEventById } from "../../../services/event/eventService";
import HistoryCard from "./HistoryCard";
import { fetchTicketsByEventId , deleteTicket } from "../../../services/tickets/ticketService";
import { fetchReservationsCountByEvent , fetchReservationsByEvent , deleteReservation} from "../../../services/reservation/reservationService";

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [reservationsCount, setReservationsCount] = useState(0);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchEvent();
        fetchTickets();
        fetchReservationsCount();
        fetchReservations();

    }, []);

    const fetchEvent = async () => {
        try {
            const eventData = await fetchEventById(eventId);
            setEvent(eventData);
        } catch (error) {
            console.error('Error fetching event details:', error); 
        }
    };

    const fetchTickets = async () => {
        try {
            const ticketsData = await fetchTicketsByEventId(eventId);
            setTickets(ticketsData);
        } catch (error) {
            console.error('Error fetching tickets:', error); 
        }
    };

    const handleDeleteTicket = async (ticketId) => {
        try {
            await deleteTicket(ticketId);
            fetchTickets();
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        try {
            console.log("Deleting reservation with ID:", reservationId); 
            await deleteReservation(reservationId);
            fetchReservations(); 
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    const fetchReservationsCount = async () => {
        try {
            console.log(`Event ID for fetching reservations count: ${eventId}`); 
            const count = await fetchReservationsCountByEvent(eventId);
            if (count !== undefined) {
                setReservationsCount(count);
            }
        } catch (error) {
            console.error("Failed to fetch reservations count:", error);
        }
    };

    const fetchReservations = async () => {
        try {
            const reservationsData = await fetchReservationsByEvent(eventId);
            console.log("Fetched reservations:", reservationsData); 
            setReservations(reservationsData.slice(0, 5));
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    return (
        <div>
            <Banner />   
            <HistoryCard event={event} 
            tickets={tickets} 
            reservations={reservations}
            reservationsCount={reservationsCount}
             onDeleteTicket={handleDeleteTicket}
             onDeleteReservation={handleDeleteReservation}
             /> 
        </div>
        
    );
};

export default EventDetails;
