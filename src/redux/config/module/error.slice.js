import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  errorMessage: '',
  errorTimestamp: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    printError: (state, action) => {
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.errorMessage;
      state.errorTimestamp = new Date().toISOString();
    },
  },
});

export const { printError } = errorSlice.actions;
export const selectError = (state) => state.error;
export default errorSlice.reducer;
