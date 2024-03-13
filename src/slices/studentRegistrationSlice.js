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
        preferedInstrument: '',
        role:'' // Removed additional fields for teachers
    },
};

export const studentRegistrationSlice = createSlice({
    name: 'studentRegistration',
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
            localStorage.setItem('token', token); // Directly store the token in localStorage
        },
    },
});

export const { updateFormData, resetFormData, setRole, setCredentialsRegistration } = studentRegistrationSlice.actions;

export default studentRegistrationSlice.reducer;
