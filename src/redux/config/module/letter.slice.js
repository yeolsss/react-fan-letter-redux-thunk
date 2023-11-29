import dumyData from '../../../common/fakeData.json';
import { createSlice } from '@reduxjs/toolkit';

const LETTER_LOCAL_STORAGE_KEY = 'fan_letter';

// ! localStorage get data
// ! 빈 값일 경우 dumyData로 초기화
const initialState =
  JSON.parse(localStorage.getItem(LETTER_LOCAL_STORAGE_KEY)) || dumyData;

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      return (state = [...state, action.payload]);
    },
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
    },
  },
});

export const { addLetter, updateLetter, deleteLetter } = letterSlice.actions;

export const selector = (state) => state.letter;
export default letterSlice.reducer;
