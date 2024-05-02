const API_BASE_URL = 'http://localhost:3000/api';

// Create feedback
export const createFeedback = async (feedbackData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/feedbacks/createFeedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });
        if (response.ok) {
            const feedback = await response.json();
            return feedback;
        } else {
            throw new Error('Failed to create feedback.');
        }
    } catch (error) {
        console.error("Error creating feedback:", error);
    }
};

// Delete feedback by ID
export const deleteFeedback = async (feedbackId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/feedbacks/${feedbackId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return 'Feedback deleted successfully';
        } else {
            throw new Error('Failed to delete feedback.');
        }
    } catch (error) {
        console.error("Error deleting feedback:", error);
    }
};

// Get all feedbacks for a specific event
export const getFeedbacks = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/feedbacks/${eventId}`);
        if (response.ok) {
            const feedbacks = await response.json();
            return feedbacks;
        } else {
            throw new Error('Failed to fetch feedbacks.');
        }
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
    }
};

// Get feedback by ID
export const getFeedbackById = async (feedbackId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/feedbacks/details/${feedbackId}`);
        if (response.ok) {
            const feedback = await response.json();
            return feedback;
        } else {
            throw new Error('Failed to fetch feedback.');
        }
    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
};

