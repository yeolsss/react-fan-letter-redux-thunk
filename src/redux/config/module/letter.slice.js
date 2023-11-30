import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../axios/jsonServer.api.js';
import { printError } from './error.slice.js';
import { printSuccess } from './success.slice.js';

const initialState = {
  letters: [],
  searchLettersStatus: {
    isLoading: false,
    isError: false,
    error: null,
  },
  addLetterStatus: {
    isLoading: false,
    isError: false,
    error: null,
  },
  updateLettersStatus: {
    isLoading: false,
    isError: false,
    error: null,
    timeStamp: null,
  },
  deleteLetterStatus: {
    isLoading: false,
    isError: false,
    error: null,
  },
};

export const __searchLetters = createAsyncThunk(
  'letter/__searchLetters',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/letters`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      thunkAPI.dispatch(
        printError({
          isError: true,
          errorMessage: '데이터 호출에 실패했습니다.',
        }),
      );
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __addLetter = createAsyncThunk(
  'letter/__addLetter',
  async (payload, thunkAPI) => {
    try {
      const response = await api.post('/letters', payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      thunkAPI.dispatch(
        printError({
          isError: true,
          errorMessage: '등록 오류!',
        }),
      );
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __deleteLetter = createAsyncThunk(
  'letter/__deleteLetter',
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete(`/letters/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      thunkAPI.dispatch(
        printError({
          isError: true,
          errorMessage: '삭제 오류!',
        }),
      );
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __updateLetter = createAsyncThunk(
  'letter/__updateLetter',
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch(`/letters/${payload.paramId}`, {
        content: payload.content,
      });
      thunkAPI.dispatch(
        printSuccess({
          isSuccess: true,
          successMessage: '글 수정이 완료되었습니다.',
        }),
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      thunkAPI.dispatch(
        printError({
          isError: true,
          errorMessage: '수정 오류!',
        }),
      );
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {},
  extraReducers: {
    [__searchLetters.pending]: (state) => {
      state.searchLettersStatus.isLoading = true;
    },
    [__searchLetters.fulfilled]: (state, action) => {
      state.searchLettersStatus.isLoading = false;
      state.letters = action.payload;
    },
    [__searchLetters.rejected]: (state) => {
      state.searchLettersStatus.isLoading = false;
    },
    [__addLetter.pending]: (state) => {
      state.addLetterStatus.isLoading = true;
    },
    [__addLetter.fulfilled]: (state, action) => {
      state.addLetterStatus.isLoading = false;
      state.letters = [...state.letters, action.payload];
    },
    [__addLetter.rejected]: (state) => {
      state.addLetterStatus.isLoading = false;
    },
    [__updateLetter.pending]: (state) => {
      state.updateLettersStatus.isLoading = true;
    },
    [__updateLetter.fulfilled]: (state, action) => {
      (state.updateLettersStatus.timestamp = new Date().toISOString()),
        (state.updateLettersStatus.isLoading = false);
      state.letters = [...state.letters, action.payload];
    },
    [__updateLetter.rejected]: (state) => {
      state.updateLettersStatus.isLoading = false;
    },
  },
});

export const selectorLetters = (state) => state.letter;
export default letterSlice.reducer;
