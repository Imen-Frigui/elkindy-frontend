import axios from "axios";
import { useSelector } from "react-redux";

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


export const validateSession = async () => {
    
    try {
      const response = await axios.get('http://localhost:3000/api/auth/validate-session', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
        }
      });
      return response;
    } catch (error) {
      console.error('Error validating session:', error);
      throw error;
    }
  };



