import { getMembers } from '../../../common/util';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getMembers,
  currentMember: getMembers[0].id,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setCurrentMember: (state, action) => {
      return { ...state, currentMember: action.payload };
    },
  },
});

export const { setCurrentMember } = memberSlice.actions;

export const selectorMember = (state) => state.member;
export default memberSlice.reducer;
