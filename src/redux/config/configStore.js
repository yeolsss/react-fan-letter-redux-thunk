import { configureStore } from '@reduxjs/toolkit';
import letter from './module/letter.slice.js';
import member from './module/member.slice.js';
import auth from './module/auth.slice.js';
import login from './module/login.slice.js';

const store = configureStore({
  reducer: {
    letter,
    member,
    auth,
    login,
  },
});
export default store;
