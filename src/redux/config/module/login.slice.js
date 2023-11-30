import { createSlice } from '@reduxjs/toolkit';
import { checkToken } from '../../../common/util.js';

const userInstance = {
  userId: '',
  nickname: '',
  avatar: '',
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
      state.userInstance = {
        userId: action.payload.userId,
        nickname: action.payload.nickname,
        avatar: action.payload.avatar,
      };
      state.isLogin = action.payload.success;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const selectorLoginData = (state) => state.login;
export default loginSlice.reducer;
