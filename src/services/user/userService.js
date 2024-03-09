import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api';
export const fetchTeachers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/teachers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //headers for authorization
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch teachers');
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
        return [];
    }
};



