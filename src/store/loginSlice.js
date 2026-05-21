import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://backend-auth-gdiz.onrender.com/api/auth/login', userData);
      console.log(response.data, "data");
      return { ...response.data, email: userData.email };
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message || 'Login failed');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'login/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://backend-auth-gdiz.onrender.com/api/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message || 'Failed to send OTP');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'login/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://backend-auth-gdiz.onrender.com/api/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message || 'Failed to reset password');
    }
  }
);

export const changePassword = createAsyncThunk(
  'login/changePassword',
  async (passwordData, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      const token = login.userData?.token;
      
      const response = await axios.put(
        'https://backend-auth-gdiz.onrender.com/api/auth/change-password', 
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message || 'Failed to change password');
    }
  }
);

const storedUser = localStorage.getItem('userData');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
    userData: parsedUser,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('userData');
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const userWithRole = {
          ...action.payload,
          role: action.payload.email?.includes('admin') ? 'admin' : 'user'
        };
        state.userData = userWithRole;
        localStorage.setItem('userData', JSON.stringify(userWithRole));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.msg || 'OTP sent to your email';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.msg || 'Password reset successfully';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.msg || 'Password changed successfully';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export const { logout, clearMessages } = loginSlice.actions;
export default loginSlice.reducer;

