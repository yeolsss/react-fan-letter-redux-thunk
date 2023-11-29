import { createSlice } from '@reduxjs/toolkit';
import { checkToken } from '../../../common/util.js';

const userInstance = {
  id: '',
  nickname: '',
  avatar: '',
  accessToken: '',
};

const initialState = {
  userInstance,
  isLogin: await checkToken(),
  isSuccess: false,
  isError: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload.success;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const selectorLoginData = (state) => state.login;
export default loginSlice.reducer;
