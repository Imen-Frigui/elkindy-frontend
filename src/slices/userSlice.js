// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(action.error)
      });
  },
});

export default userSlice.reducer;
