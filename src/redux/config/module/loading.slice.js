import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingModal: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoadingModal = payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
export const selectorLoading = (state) => state.loading;
export default loadingSlice.reducer;
