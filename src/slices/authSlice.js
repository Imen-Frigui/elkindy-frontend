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
    setGoogleCredentials: (state, action) => {
      const { user } = action.payload;
      state.userInfo = user; // Assuming user info from Google comes structured appropriately
      if (user.token) { // Google might send a different kind of token, handle accordingly
        localStorage.setItem('token', user.token);
      }
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

export const { setCredentials, logout, setLoginError,setGoogleCredentials } = authSlice.actions;

export default authSlice.reducer;
