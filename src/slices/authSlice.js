import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
    loginError: null, // Initial state for login error
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.userInfo = action.payload;
      localStorage.setItem('token', user.token); // Directly store the token in localStorage
    },
   
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('token');
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload; // Set the login error message
    },
  },
});

export const { setCredentials, logout ,updateRegistrationData,setLoginError} = authSlice.actions;

export default authSlice.reducer;