import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {
      firstName: '',
      lastName: '',
      username: '', // Automatically generated from firstName and lastName
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      gender: '',
      // Additional fields for a teacher
      degree: '',
      specialization: '',
      teachingExperience: '',
      coursesTaught: '',
      // Role will be set based on the page context
      role: '', // Assume it's either 'teacher' or 'student'
      preferedInstrument:''
    },
  };

  export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
      updateFormData: (state, action) => {
        const { field, value } = action.payload;
        state.formData[field] = value;
        // Automatically update the username when first or last name changes
        if (field === 'firstName' || field === 'lastName') {
          state.formData.username = `${state.formData.firstName}${state.formData.lastName}`;
        }
      },
      setRole: (state, action) => {
        state.formData.role = action.payload;
      },
      resetFormData: (state) => {
        state.formData = initialState.formData;
      },
      setCredentialsRegistration: (state, action) => {
        const { user, token } = action.payload;
        state.userInfo = user;
        localStorage.setItem('token',token); // Directly store the token in localStorage
      },

    },
  });
export const { updateFormData, resetFormData ,setRole,setCredentialsRegistration} = registrationSlice.actions;

export default registrationSlice.reducer;
