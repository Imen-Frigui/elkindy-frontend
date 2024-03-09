import React, { useState } from 'react';
import authImg from "assets/img/auth/auth1.png";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import{updateRegistrationData} from 'slices/authSlice';


const TeacherFormStep1 = ({ onNext }) => {


    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
  });
    const [errors, setErrors] = useState({});

    const schema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        gender: Yup.string().required('Gender is required'),
        address: Yup.string().required('Address is required'),
        dateOfBirth: Yup.date().required('Date of birth is required'),
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            // Automatically update the username when first or last name changes
            ...(name === 'firstName' || name === 'lastName' ? { username: `${prevFormData.firstName}${name === 'lastName' ? value : prevFormData.lastName}` } : {}),
        }));
    };
    const handleNext = async (e) => {
        e.preventDefault();
        try {
            // Validate form data against the schema
            await schema.validate(formData, { abortEarly: false });
            dispatch(updateRegistrationData(formData));
            onNext(); // Proceed to the next step
        } catch (err) {
            // Construct error messages
            const newErrors = err.inner.reduce((acc, error) => ({
                ...acc,
                [error.path]: error.message,
            }), {});
            setErrors(newErrors);
        }
    };

    return (
        <div className="grid lg:grid-cols-2">
            <div className="bg-customBackground ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full"
                 style={{ borderRadius: '30px 0 0 30px' }}>
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">Sign In</h4>
                <p className="mb-9 text-base text-gray-600 text-center">Enter your details to sign up!</p>
                {/* Form content */}
                <form onSubmit={handleNext}>
                    {/* First Name */}
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.firstName ? 'border-red-500' : ''}`}
                        value={formData.firstName || ''}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    
                    {/* Last Name */}
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.lastName ? 'border-red-500' : ''}`}
                        value={formData.lastName || ''}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.email ? 'border-red-500' : ''}`}
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    
                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.password ? 'border-red-500' : ''}`}
                        value={formData.password || ''}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.gender ? 'border-red-500' : ''}`}
                        value={formData.gender || ''}
                        onChange={handleChange}
                    />
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.address ? 'border-red-500' : ''}`}
                        value={formData.address || ''}
                        onChange={handleChange}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none mb-3 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                        value={formData.dateOfBirth || ''}
                        onChange={handleChange}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                      {/* Role Dropdown */}
                      <div className="mb-4">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role:</label>
                        <select 
                            id="role" 
                            name="role"
                            onChange={handleChange} 
                            value={formData.role || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        >
                            <option value="">Select your role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            {/* Add more roles as needed */}
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>
                    <button type="submit" className="mt-2 w-full bg-blue-700 py-[12px] text-base font-medium text-white">
                        Next
                    </button>
                </form>
            </div>
            <div className="h-full bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${authImg})`, borderRadius: '0 30px 30px 0' }} />
        </div>
    );
};

export default TeacherFormStep1;