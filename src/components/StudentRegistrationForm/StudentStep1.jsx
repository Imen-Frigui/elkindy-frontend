import React, {useEffect, useState} from 'react';
import authImg from "assets/img/auth/registerstudent.jpg";
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
    setCredentialsRegistration,
    setRole,
    updateFormData,
    addCourse,
    setCourses
} from 'slices/studentRegistrationSlice';
import {Input, Typography} from '@material-tailwind/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {useRegisterMutation} from 'slices/userApiSlice';
import {TagsInput} from 'react-tag-input-component';
import '../StudentRegistrationForm/tags.css';
import {useNavigate, useParams} from 'react-router-dom';

const StudentFormStep1 = ({ onNext }) => {
  const Navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector(state => state.studentRegistration.formData);
    const [errors, setErrors] = useState({});
    const [register, { isLoading }] = useRegisterMutation();
    const [selected, setSelected] = useState([]);
    const acceptedValues = ['piano', 'guitar', 'violin', 'drums', 'flute', 'saxophone', 'trumpet', 'clarinet', 'trombone', 'bass', 'cello', 'viola', 'harp', 'accordion', 'banjo', 'mandolin', 'ukulele', 'bagpipes', 'harmonica', 'organ', 'synthesizer', 'keyboard', 'electric guitar', 'bass guitar', 'acoustic guitar', 'electric bass', 'double bass', 'electric'];
    let { courseId } = useParams();


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
    }, [dispatch, formData]);

    const handleTagsChange = (tags) => {
        console.log(formData)
        setSelected(tags);
        dispatch(updateFormData({ field: 'preferedInstrument', value: tags}));
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
             /*
            // Check email existence in your database
            const emailExistsResponse = await fetch(`http://localhost:3000/api/auth/check-email/${formData.email}`);
            if (emailExistsResponse.ok) {
                const data = await emailExistsResponse.json();
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
    
            // Verify email using the quickemailverification API
            const options = {
                method: 'GET',
                url: 'https://quickemailverification.p.rapidapi.com/v1/verify',
                params: { email: formData.email },
                headers: {
                    Authorization: 'fcfc270fa60787dbe029b0e0a28fafbf159062264c54b0f245803e3355aa',
                    'X-RapidAPI-Key': '3a97662529mshf6ceb2a7f2d6b91p13098bjsn1e114a6cd770',
                    'X-RapidAPI-Host': 'quickemailverification.p.rapidapi.com'
                  }
            };
    
            const emailVerificationResponse = await axios.request(options);
            if (emailVerificationResponse.data && emailVerificationResponse.data.result !== "valid") {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'Email is not valid'
                }));
                return;
            }
            */
            // Check phone number existence in your database
            const phoneExistsResponse = await fetch(`http://localhost:3000/api/auth/check-phone/${formData.phoneNumber}`);
            if (phoneExistsResponse.ok) {
                const data = await phoneExistsResponse.json();
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


            console.log(formData);
            const result = await register(formData).unwrap();
            dispatch(setCredentialsRegistration({ ...result }));
            Navigate('/student/default');
            onNext();
        } catch (err) {
            if (err.inner) {
                const newErrors = err.inner.reduce((acc, error) => ({
                    ...acc,
                    [error.path]: error.message,
                }), {});
                setErrors(newErrors);
            } else {
                // Handle other types of errors (e.g., network errors)
                console.error('An unexpected error occurred:', err);
                // Optionally set a generic error message or handle the error differently
                setErrors({ generic: "An unexpected error occurred. Please try again." });
            }
        }
    };




    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
            <div className="bg-lightblue ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full"
                 style={{ borderRadius: '30px 0 0 30px' }}>
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">Sign up as Student</h4>
                <p className="mb-9 text-base text-gray-600 text-center">Enter your details to sign up!</p>
                {/* Form content */}
                <form onSubmit={submitHandler}>
                    <div className="flex mt-7 flex-col md:flex-row md:space-x-4">
                        <Input 
                            className='flex-1  dark:text-gray-500  text-gray-800  rounded-xl border-none  bg-white/0 p-3 text-[16px] text-gray-750 '
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
                           {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        <Input
                            className='flex-1   dark:text-gray-500  text-gray-800 rounded-xl border-none mb-3 bg-white/0 p-3 text-[16px] text-gray-750'
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
                        {/*
                        <Input
                            className='flex-1   dark:text-gray-500  text-gray-800 rounded-xl border-none mb-3 bg-white/0 p-3 text-[16px] text-gray-750'
                            icon={<FontAwesomeIcon icon={faUser} />}
                            label="Last Name"
                            variant='outlined'
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.courses || ''}
                            onChange={handleChange}
                        />
                        */}
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    
                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="Email"
                        name='email'
                        className="mt-7 mb-4 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 text-[16px] text-gray-750 "
                        value={formData.email || ''}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

<div  className=" mt-7  ">
                    <Input 
                        type="date" 
                        label='Birth Date'
                        placeholder="Birth Date" 
                        value={formData.dateOfBirth || ''}
                        className="  h-12  mb-3  w-full items-center justify-center dark:text-gray-500  font-extrabold text-gray-800 rounded-xl border-none bg-white/0 p-3 text-lg outline-none text-[16px] text-gray-750 "
 
                        onChange={handleChange}
                        name="dateOfBirth"
                        dateFormat="dd/MM/yyyy" 
                        error={Boolean(errors.dateOfBirth)}
                        helperText={errors.dateOfBirth}
                        max="2018-12-31"
                        min="1900-01-01"
                    />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                        </div>
                    <Input 
                        type="password"
                        name='password'
                                                className="mt-7 flex h-12 w-full items-center justify-center dark:text-gray-500  text-gray-800 rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 text-[16px] text-gray-750 "

                        icon={<FontAwesomeIcon icon={faLock} />}
                        label="Password" 
                        classNames="mt-7 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 text-[16px] text-gray-750"
                        value={formData.password || ''}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <Typography
                        variant="small"
                        color="gray"
                        className={`mt-2 flex items-center gap-1 font-normal ${errors.password ? 'text-red-500' : 'text-gray-600'}`}                     >
                        
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
                        className="mt-7 flex h-12 w-full items-center dark:text-gray-500  text-gray-800 justify-center rounded-xl border-none bg-white/0 p-3 text-lg outline-none mb-3 text-[16px] text-gray-750 "
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
    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}

                    {/* New input for preferred instrument */}



                    <div
      className="bg-gray-50 mt-7  dark:bg-gray-800 ">
           <label htmlFor="Prefered Instrument" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prefered Instrument:</label>
                <TagsInput
                
                beforeAddValidate={(tag) => {
                    if ( !acceptedValues.includes(tag.toLocaleLowerCase()) ) {
                        <p className="text-red-500 text-sm mt-1">put a valid instrument ! </p>
                        return false;
                    }
                    return true;
                }}

               
                classNames={{
                    container: ".rti--container",
                    tag: "bg-blue-500 text-blue text-lg border border-gray-800 rounded-lg px-2 py-1 mr-2 dark:text-white dark:bg-gray-800",
                    input: "border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring focus:border-blue-500 text-[17px] text-gray-750"
                }}
                value={selected}
                
                onChange={handleTagsChange}
                name="preferedInstrument"
                placeHolder="piano, guitar, violin, etc."
                />  
                <em className="text-sm text-gray-500">Press enter </em>
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
