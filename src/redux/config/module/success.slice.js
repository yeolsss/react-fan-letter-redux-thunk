import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSuccess: false,
  successMessage: '',
  successTimestamp: '',
};

const successSlice = createSlice({
  name: 'success',
  initialState,
  reducers: {
    printSuccess: (state, action) => {
      state.isSuccess = true;
      state.successMessage = action.payload.successMessage;
      state.successTimestamp = new Date().toISOString();
    },
  },
});

export const { printSuccess } = successSlice.actions;

export const selectSuccess = (state) => state.success;
export default successSlice.reducer;
