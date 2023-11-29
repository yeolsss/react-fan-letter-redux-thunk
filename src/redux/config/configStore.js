import { configureStore } from '@reduxjs/toolkit';
import letter from './module/letter';
import member from './module/member';

const store = configureStore({
  reducer: {
    letter,
    member,
  },
});
export default store;
