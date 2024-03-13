import React, { useEffect, useState } from 'react';
import authImg from "assets/img/auth/registerstudent.jpg";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setRole } from 'slices/studentRegistrationSlice';
import { Input, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { setCredentialsRegistration } from 'slices/studentRegistrationSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from 'slices/userApiSlice';
import { TagsInput } from 'react-tag-input-component';
import '../StudentRegistrationForm/tags.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const StudentFormStep1 = ({ onNext }) => {
  const Navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector(state => state.studentRegistration.formData);
    const [errors, setErrors] = useState({});
    const [register, { isLoading }] = useRegisterMutation();
    const [selected, setSelected] = useState([]);

    const schema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{2}[0-9]{3}[0-9]{3}$/,"Invalid phone number" ),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Must contain 8 characters, one uppercase, one lowercase letter, and one number"
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
            preferedInstrument: Yup.array().min(1, 'prefered Instrumens is required').required('prefered Instruments is required'),
    });

    useEffect(() => {
        console.log(formData);
        dispatch(setRole('student'));

    }, [formData]);

    const handleTagsChange = (tags) => {
        console.log(formData)
        setSelected(tags);
        dispatch(updateFormData({ field: 'preferedInstrument', value: tags }));
      };
    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch(updateFormData({ field: name, value }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: null // or null, or ''
        }));
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });
    
            // Check email existence
            const emailExistsResponse = await fetch(`http://localhost:3030/api/auth/check-email/${formData.email}`);
            if (emailExistsResponse.ok) {
                const data = await emailExistsResponse.json();
                console.log(data.exists);
                if (data.exists) {  
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: 'Email already exists'
                    }));
                    return;
                }
            } else {
                console.error('Failed to fetch email existence:', emailExistsResponse.statusText);
            }
    
            // Check phone number existence
            const phoneExistsResponse = await fetch(`http://localhost:3030/api/auth/check-phone/${formData.phoneNumber}`);
            if (phoneExistsResponse.ok) {
                const data = await phoneExistsResponse.json();
                console.log(data.exists);
                if (data.exists) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        phoneNumber: 'Phone number already exists'
                    }));
                    return;
                }
            } else {
                console.error('Failed to fetch phone number existence:', phoneExistsResponse.statusText);
            }
    
            const result = await register(formData).unwrap();
            dispatch(setCredentialsRegistration({ ...result }));
            Navigate('/admin/default');
            onNext();
        } catch (err) {
            const newErrors = err.inner.reduce((acc, error) => ({
                ...acc,
                [error.path]: error.message,
            }), {});
            setErrors(newErrors);
        }
    };






    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
            <div className="bg-customBackground ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full"
                 style={{ borderRadius: '30px 0 0 30px' }}>
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">Sign up as Student</h4>
                <p className="mb-9 text-base text-gray-600 text-center">Enter your details to sign up!</p>
                {/* Form content */}
                <form onSubmit={submitHandler}>
                    <div className="flex mt-7 flex-col md:flex-row md:space-x-4">
                        <Input 
                            className='flex-1  dark:text-gray-500  text-gray-800  rounded-xl border-none  bg-white/0 p-3 text-lg '
                            icon={<FontAwesomeIcon icon={faUser} />}
                            label='First Name'
                            variant='outlined'
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName}
                            helpertext= {errors.firstName}
                        />
                        <Input
                            className='flex-1   dark:text-gray-500  text-gray-800 rounded-xl border-none mb-3 bg-white/0 p-3 text-lg '
                            icon={<FontAwesomeIcon icon={faUser} />}
                            label="Last Name" 
                            variant='outlined'
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName}
                        />
                    </div>
                    
                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="Email"
                        name='email'
                        className="mt-7 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 "
                        value={formData.email || ''}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />

                    <Input 
                        type="date" 
                        label='Birth Date'
                        placeholder="Birth Date" 
                        className="mt-7 flex h-12 w-full items-center justify-center dark:text-gray-500  text-gray-800 rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 "
                        value={formData.dateOfBirth || ''}
                        onChange={handleChange}
                        name="dateOfBirth"
                        error={Boolean(errors.dateOfBirth)}
                        helperText={errors.dateOfBirth}
                    />

                    <Input 
                        type="password"
                        name='password'
                        icon={<FontAwesomeIcon icon={faLock} />}
                        label="Password" 
                        className="mt-7 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3"
                        value={formData.password || ''}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <Typography
                        variant="small"
                        color="gray"
                        className=" mt-2 flex items-center gap-1 font-normal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Use at least 8 characters, one uppercase, one lowercase and one number.
                    </Typography>

                    <Input
                        type="password"
                        icon={<FontAwesomeIcon icon={faCheck} />}
                        label="Confirm Password"
                        className="mt-7 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 "
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                    />

                    <Input 
                        type="text" 
                        label='Phone Number'
                        placeholder="Phone Number" 
                        className="mt-7 mb-3 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 "
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                        name="phoneNumber"
                        icon={<FontAwesomeIcon icon={faPhone} />}
                        error={Boolean(errors.phoneNumber)}
                        helperText={errors.phoneNumber}
                    />

                    {/* New input for preferred instrument */}
                 
   
                    <div
      className="bg-gray-50 mt-7  dark:bg-gray-800 ">
           <label htmlFor="Prefered Instrument" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prefered Instrument:</label>
                <TagsInput
                
                beforeAddValidate={(tag) => {
                    if (tag.length < 3) {
                        <p className="text-red-500 text-sm mt-1">error taille</p>
                        return false;
                    }
                    return true;
                }}

               
                classNames={{
                    container: ".rti--container",
                    tag: "bg-blue-500 text-blue text-lg border border-gray-800 rounded-lg px-2 py-1 mr-2 dark:text-white dark:bg-gray-800",
                    input: "border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                }}
                value={selected}
                onChange={handleTagsChange}
                name="preferedInstrument"
                placeHolder="piano, guitar, violin, etc."
                />  
                <em className="text-sm text-gray-500">Press enter or comma to add new tag</em>
                {errors.preferedInstrument && <p className="text-red-500 text-sm mt-1">{errors.preferedInstrument}</p>}
            </div>
   

            <button 
    type="submit" 
    className="mt-2 w-full bg-kindyorange py-[12px] text-base font-medium text-white rounded-tl-3xl rounded-br-3xl hover:bg-transparent hover:border-kindyorange hover:border-2 hover:text-blue-700 border-2 border-white/0 hover:bg-white/0 hover:text-kindyorange"
>
    Register
</button>

                </form>
            </div>
            <div className="h-full bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${authImg})`, borderRadius: '0 30px 30px 0' }} />
        </div>
    );
};

export default StudentFormStep1;
