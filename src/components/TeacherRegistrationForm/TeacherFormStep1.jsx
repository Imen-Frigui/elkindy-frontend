import React, { useEffect, useState } from 'react';
import authImg from "assets/img/auth/register1.jpg";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import{updateRegistrationData} from 'slices/authSlice';
import axios from 'axios';
import { Input, Typography } from '@material-tailwind/react';
    // Clear the error as soon as the user starts correcting it.
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faCheck,faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { updateFormData ,setRole} from 'slices/registrationSlice';
const TeacherFormStep1 = ({ onNext }) => {
  
    const dispatch = useDispatch();
    const formData = useSelector(state => state.registration.formData);

    
    const [errors, setErrors] = useState({});

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
    });
    useEffect(() => {
        console.log(formData);
        dispatch(setRole('teacher'))

      }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch(updateFormData({ field: name, value }));
        dispatch(setRole('teacher'))
            // Automatically update the username when first or last name changes
          console.log(formData);
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: null // or null, or ''
          }));
      };
    

      const handleNext = async (e) => {
          e.preventDefault();
      
          try {
              // Validate formData with your schema
              await schema.validate(formData, { abortEarly: false });
      
              // Check if the email already exists in your database
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
      
              // Email verification using the quickemailverification API
              const options = {
                method: 'GET',
                url: 'https://quickemailverification.p.rapidapi.com/v1/verify',
                params: {
                  email: formData.email
                },
                headers: {
                  Authorization: 'fcfc270fa60787dbe029b0e0a28fafbf159062264c54b0f245803e3355aa',
                  'X-RapidAPI-Key': '3a97662529mshf6ceb2a7f2d6b91p13098bjsn1e114a6cd770',
                  'X-RapidAPI-Host': 'quickemailverification.p.rapidapi.com'
                }
              };
      
              const response = await axios.request(options);
              if (response.data && response.data.result === "valid") {
                  console.log("Email is valid:", response.data);
      
                  // Proceed to the next step if the email is valid
                  onNext();
              } else {
                  // Handle the case where the email is not valid
                  setErrors(prevErrors => ({
                      ...prevErrors,
                      email: 'Email is not valid'
                  }));
              }
      
          } catch (error) {
              if (error.response) {
                  console.error('API error:', error.response.data);
              } else if (error.request) {
                  console.error('Network error:', error.request);
              } else {
                  console.error('Error:', error.message);
              }
      
              // Handle validation errors from Yup
              if (error.inner) {
                  const newErrors = error.inner.reduce((acc, curr) => ({
                      ...acc,
                      [curr.path]: curr.message,
                  }), {});
                  setErrors(newErrors);
              }
          }
      };
    
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
                    <div className="bg-lightblue ml-20 dark:bg-gray-800 shadow-lg p-8 max-w-xl w-full"
                 style={{ borderRadius: '30px 0 0 30px' }}>
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">Sign up as Teacher</h4>
                <p className="mb-9 text-base text-gray-600 text-center">Enter your details to sign up!</p>
                {/* Form content */}
                <form onSubmit={handleNext}>
                    {/* First Name */}
                    
                    <div className="flex mt-7 flex-col md:flex-row md:space-x-4">

                    <Input 
                    className='flex-1  rounded-xl border-none  bg-white/0 p-3 text-[16px] text-gray-750'
                    
                      icon={<FontAwesomeIcon icon={faUser} />}
                      label='First Name'
                      variant='outlined'
                            placeholder="FirstName"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName}
                        />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        
                        <Input
                    className='flex-1  rounded-xl border-none mb-3 bg-white/0 p-3 text-[16px] text-gray-750'
                
                             icon={<FontAwesomeIcon icon={faUser} />}
                           label="Last Name" 
                           variant='outlined'
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName}
                        />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    {/* Email */}
                    <Input
                     type="email"
                     label="Email Address"
                    placeholder="Email"
                    name='email'
                        className="mt-7 flex h-12 w-full items-center justify-center rounded-xl border-none bg-white/0 p-3 outline-none mb-3 text-[16px] text-gray-750 "
                        value={formData.email || ''}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                      <Input 
                        type="date" 
                        label='Birth Date'
                        placeholder="12-345-678" 
                        className="mt-7 flex h-12 w-full items-center justify-center rounded-xl border-none bg-white/0 p-3 text-sm outline-none mb-3  text-base"
                        value={formData.dateOfBirth || ''}
                        onChange={handleChange}
                        name="dateOfBirth"
                      
                        error={Boolean(errors.dateOfBirth)}
                        helperText={errors.dateOfBirth}
                    />
                             {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}

                    {/* Password */}
                      <Input 
                      type="password"
                      name='password'
                      icon={<FontAwesomeIcon icon={faLock} />}

                      label="Password" 
                    className="mt-7 flex h-12 w-full items-center justify-center rounded-xl border-none bg-white/0 p-3 text-sm outline-none mb-3 text-[16px] text-gray-750"
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
                        className="mt-7 flex h-12 w-full items-center justify-center rounded-xl border-none bg-white/0 p-3 text-sm outline-none mb-3 text-[16px] text-gray-750 "
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                    />

                    <Input 
                        type="text" 
                        label='Phone Number'
                        placeholder="12-345-678" 
                        className="mt-7 flex h-12 w-full items-center justify-center rounded-xl border-none bg-white/0 p-3 text-sm outline-none mb-3 text-[16px] text-gray-750  "
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                        name="phoneNumber"
                        icon={<FontAwesomeIcon icon={faPhone} />}
                        error={Boolean(errors.phoneNumber)}
                        helperText={errors.phoneNumber}
                    />


                    <button type="submit"      className="mt-2 w-full bg-kindyorange py-[12px] text-base font-medium text-white rounded-tl-3xl rounded-br-3xl hover:bg-transparent hover:border-kindyorange hover:border-2 hover:text-blue-700 border-2 border-white/0 hover:bg-white/0 hover:text-kindyorange"
>
                        Next
                    </button>
                </form>
            </div>
            <div className="h-full bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${authImg})`, borderRadius: '0 30px 30px 0' }} />
        </div>
    );
};

export default TeacherFormStep1;