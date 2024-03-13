const API_BASE_URL = 'http://localhost:3000/api';

export const fetchEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};
export const fetchEventById = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch event:", error);
    }
};
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/updateEvent/${eventId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to update event:", error);
    }
};


export const addEvent = async (eventData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/createEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to add event:", error);
    }
};


export const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/deleteEvent/${eventId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to delete event:", error);
    }
};



