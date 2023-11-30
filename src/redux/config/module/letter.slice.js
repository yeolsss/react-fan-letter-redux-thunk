import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../axios/jsonServer.api.js';
import { printError } from './error.slice.js';

const LETTER_LOCAL_STORAGE_KEY = 'fan_letter';

const initialState = {
  letters: [],
  isLoading: false,
};

export const __searchLetters = createAsyncThunk(
  'letter/__searchLetters',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/letters`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        printError({
          isError: true,
          errorMessage: error.response.data.message,
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
      console.log(error);
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

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    /*
    updateLetter: (state, action) => {
      state = state.map((letter) => {
        if (letter.id === action.payload.id) {
          letter.content = action.payload.content;
        }
        return letter;
      });
      localStorage.setItem(LETTER_LOCAL_STORAGE_KEY, JSON.stringify(state));
      return state;
    },
    deleteLetter: (state, action) => {
      return (state = state.filter((letter) => letter.id !== action.payload));
    },*/
  },
  extraReducers: {
    [__searchLetters.pending]: (state, action) => {},
    [__searchLetters.fulfilled]: (state, action) => {
      state.letters = action.payload;
    },
    [__searchLetters.rejected]: (state, action) => {},
    [__addLetter.pending]: (state, action) => {},
    [__addLetter.fulfilled]: (state, action) => {
      state.letters = [...state.letters, action.payload];
    },
    [__addLetter.rejected]: (state, action) => {},
  },
});

export const { addLetter, updateLetter, deleteLetter } = letterSlice.actions;

export const selectorLetters = (state) => state.letter;
export default letterSlice.reducer;
