const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTickets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const fetchTicketById = async (ticketId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch ticket:", error);
    }
};
export const updateTicket = async (ticketId, ticketData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/updateTicket/${ticketId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to update ticket:", error);
    }
};


export const  addTicket = async (ticketData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/createTicket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to add ticket:", error);
    }
};


export const deleteTicket = async (ticketId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/deleteTicket/${ticketId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to delete ticket:", error);
    }  
};

export const fetchTicketsByEventId = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/event/${eventId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch tickets by event ID:", error);
    }
};

