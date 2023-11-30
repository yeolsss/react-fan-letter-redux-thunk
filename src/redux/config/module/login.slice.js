import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkToken } from '../../../common/util.js';
import { printError } from './error.slice.js';
import authInstance from '../../../axios/auth.api.js';
import { setIsLoading } from './loading.slice.js';

const userInstance = {
  userId: '',
  nickname: '',
  avatar: '',
  accessToken: '',
};

const initialState = {
  userInstance,
  isLogin: await checkToken(),
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLoginState = createAsyncThunk(
  'login/__getLoginState',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    try {
      const accessToken = localStorage.getItem('accessToken') || '';

      authInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;

      const response = await authInstance.get('/user');
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.dispatch(
        setLogin({ ...response.data, accessToken: accessToken }),
      );
    } catch (error) {
      thunkAPI.dispatch(setIsLoading(false));
      thunkAPI.dispatch(
        printError({
          isError: true,
          errorMessage: '로그인 정보가 없습니다.',
        }),
      );

      return thunkAPI.rejectWithValue(error);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { id, nickname, avatar, success, accessToken } = action.payload;
      state.userInstance = {
        userId: id,
        nickname: nickname,
        avatar: avatar || '',
        accessToken: accessToken,
        success: success,
      };
      state.isLogin = success;
      localStorage.setItem('accessToken', accessToken);
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const selectorLoginData = (state) => state.login;
export default loginSlice.reducer;
