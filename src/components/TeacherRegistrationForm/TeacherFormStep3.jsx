import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentialsRegistration } from 'slices/registrationSlice';
import { useRegisterMutation } from 'slices/userApiSlice';

const TeacherFormStep3 = ({ onBack, onConfirm }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const formData = useSelector(state => state.registration.formData);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
      if (userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await register(formData).unwrap();
            dispatch(setCredentialsRegistration({ ...result }));
            navigate('/admin/default');
        } catch (err) {
            toast.error(err?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-kindygray">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 space-y-6 bg-lightblue">
                <h3 className="text-2xl font-semibold text-center">Confirm Your Details</h3>
                <p className="text-gray-600">Please review all your details and click confirm to complete your registration.</p>
                <div className="flex justify-between">
                    <button type="button" onClick={onBack}     className="px-6 py-2 border border-white/0 text-kindyblue bg-white/0 hover:bg-kindyblue rounded-tl-2xl rounded-br-2xl hover:text-white hover:border-blue-700 rounded-md"
>Back</button>
                    <button onClick={submitHandler}     className="px-6 py-2 hover:text-white hover:bg-kindyorange bg-white/0 border-2 rounded-tl-2xl rounded-br-2xl  text-kindyorange border-kindyorange hover:border-2 rounded-md h"
>
                        {isLoading ? 'Registering...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherFormStep3;
