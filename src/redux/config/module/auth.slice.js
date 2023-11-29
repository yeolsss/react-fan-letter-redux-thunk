import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../axios/auth.api.js';

const initialState = {
  signUp: {
    isError: false,
    isSuccess: false,
    error: null,
  },
  login: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    token: null,
  },
};

export const __signUp = createAsyncThunk(
  'auth/__signUp',
  async (payload, thunkAPI) => {
    try {
      const response = await api.post(`/register`, payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __login = createAsyncThunk(
  'auth/__logIn',
  async (payload, thunkAPI) => {
    try {
      const response = await api.post(`/login`, payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.error(error);
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
    [__login.pending]: (state, action) => {
      state.login.isError = false;
      state.login.isSuccess = false;
    },
    [__login.fulfilled]: (state, action) => {
      state.login.isError = false;
      state.login.isSuccess = true;
      state.login.token = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    [__login.rejected]: (state, action) => {
      state.login.isError = true;
      state.login.isSuccess = false;
      state.login.error = action.payload;
    },
  },
});

export const selectSignUp = (state) => state.auth.signUp;
export const selectLogin = (state) => state.auth.login;

export default authSlice.reducer;
