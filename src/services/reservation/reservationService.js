const API_BASE_URL = 'https://elkindy-backend.onrender.com/api';

export const createReservation = async (reservationData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/addReservation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create reservation:", error);
    }
};

export const fetchReservations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch reservations:", error);
    }
};

export const fetchReservationById = async (reservationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch reservation by ID:", error);
    }
};

export const createPaymentIntent = async (paymentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok when creating payment intent.');
        }

        const paymentIntentData = await response.json();
        return paymentIntentData; 
    } catch (error) {
        console.error("Failed to create payment intent:", error);
    }
};

export const fetchReservationsCountByEvent = async (eventId) => {
    try {
        console.log(`Fetching reservations count for event ID: ${eventId}`); 
        const response = await fetch(`${API_BASE_URL}/reservations/${eventId}/reservations/count`);
        if (response.ok) {
            const data = await response.json();
            console.log(`Reservations count fetched:`, data); 
            return data.reservationsCount;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch reservations count:", error);
    }
};

export const fetchReservationsByEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/${eventId}/reservations`);
        if (response.ok) {
            const reservations = await response.json();
            return reservations;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch reservations:", error);
    }
};

export const deleteReservation = async (reservationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/deleteReservation/${reservationId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to delete reservation:", error);
    }
};


export const getReservationById = async (reservationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/reservations/${reservationId}`);
        if (response.ok) {
            const reservation = await response.json();
            return reservation;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to fetch reservation:", error);
    }
};

export const participateInEvent = async (participationData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations/participate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(participationData)
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok.');
        }
    } catch (error) {
        console.error("Failed to participate in event:", error);
    }
};

// export const participateInEvent = async (participationData) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/reservations/participate`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(participationData)
//         });
//         const result = await response.json(); // Always parse the JSON to get the result
//         if (response.ok) {
//             return { success: true, data: result };
//         } else {
//             // Return an object with success as false and the error message
//             return { success: false, error: result.message };
//         }
//     } catch (error) {
//         console.error("Failed to participate in event:", error);
//         return { success: false, error: 'Network response was not ok.' };
//     }
// };

