import { useEffect, useState } from 'react';
import axios from 'axios';

const useRoleValidation = () => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://elkindy-backend.onrender.com/api/auth/verifyTokenAndRole', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserRole(response.data.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (localStorage.getItem('token')) {
            fetchUserRole();
        }//update the condtiton of loader to the loader dosnt keep spining if the user didnt login
        if(localStorage.getItem('token') === null){
            setIsLoading(false);
        }
    }, []);

    return { userRole, isLoading };
};


export default useRoleValidation;