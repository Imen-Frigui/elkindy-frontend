import { useEffect, useState } from 'react';
import axios from 'axios';

const useRoleValidation = () => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3030/api/auth/verifyTokenAndRole', {
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
        }
    }, []);

    return { userRole, isLoading };
};


export default useRoleValidation;