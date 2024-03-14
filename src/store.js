import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import registrationReducer from './slices/registrationSlice';
import studentRegistrationSlice from './slices/studentRegistrationSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    registration: registrationReducer,
    studentRegistration: studentRegistrationSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;