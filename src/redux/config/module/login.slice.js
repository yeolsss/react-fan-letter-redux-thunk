import { createSlice } from '@reduxjs/toolkit';
import { checkToken } from '../../../common/util.js';

const initialState = {
  isLogin: await checkToken(),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
});

export const selectLogin = (state) => state.login.isLogin;
export default loginSlice.reducer;
