import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'form/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://backend-auth-gdiz.onrender.com/api/auth/register', userData);
      console.log(response.data, "data");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message || 'Registration failed');
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  data: null
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export default formSlice.reducer;

