import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from 'slices/authSlice';
import { useRegisterMutation } from 'slices/userApiSlice';

const TeacherFormStep3 = ({ onBack, onConfirm }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    // Fetch the accumulated registration data from the Redux state
    const registrationData = useSelector((state) => state.auth.registrationData);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
      if (userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
     
            try {
                const result = await register(registrationData).unwrap();
                dispatch(setCredentials({ ...result }));
                console.log(result);
                navigate('/admin/default');
            } catch (err) {
                toast.error(err?.data?.message || 'Registration failed');
            }
        
    };

    return (
        <div>
            <h3>Step 3: Confirm Your Details</h3>
            <p>Please review all your details and click confirm to complete your registration.</p>
      
            <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 rounded-md">Back</button>
            <button onClick={submitHandler}>Confirm</button>
        </div>
    );
};

export default TeacherFormStep3;