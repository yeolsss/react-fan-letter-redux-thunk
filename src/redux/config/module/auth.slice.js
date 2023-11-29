import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../axios/auth.api.jsx';
import { printError } from './error.slice.js';

const initialState = {
  signUp: {
    isError: false,
    isSuccess: false,
    error: null,
  },
};

export const __signUp = createAsyncThunk(
  'auth/__signUp',
  async (payload, thunkAPI) => {
    try {
      const response = await api.post(`/register`, payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      thunkAPI.dispatch(printError(true, error));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [__signUp.pending]: (state, action) => {
      state.signUp.isError = false;
      state.signUp.isSuccess = false;
    },
    [__signUp.fulfilled]: (state, action) => {
      state.signUp.isError = false;
      state.signUp.isSuccess = true;
    },
    [__signUp.rejected]: (state, action) => {
      state.signUp.isError = true;
      state.signUp.isSuccess = false;
      state.signUp.error = action.payload;
    },
  },
});

export const selectSignUp = (state) => state.auth.signUp;

export default authSlice.reducer;
