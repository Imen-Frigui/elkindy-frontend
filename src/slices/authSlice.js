import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.userInfo = user;
      localStorage.setItem('token', user.token); // Directly store the token in localStorage
    },
   
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout ,updateRegistrationData} = authSlice.actions;

export default authSlice.reducer;