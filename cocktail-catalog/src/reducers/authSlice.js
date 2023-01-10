import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  loading: false,
  success: false,
  error: false,
  message: '',
};

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (data, thunkAPI) => {
    try {
      return await authService.loginAdmin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async () => {
  await authService.logoutAdmin();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = user ? user : null;
      state.loading = false;
      state.error = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
