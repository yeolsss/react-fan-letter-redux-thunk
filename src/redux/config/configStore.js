import { configureStore } from '@reduxjs/toolkit';
import letter from './module/letter.slice.js';
import member from './module/member.slice.js';
import auth from './module/auth.slice.js';
import login from './module/login.slice.js';
import error from './module/error.slice.js';
import success from './module/success.slice.js';
import loading from './module/loading.slice.js';

const store = configureStore({
  reducer: {
    letter,
    member,
    auth,
    login,
    error,
    success,
    loading,
  },
});
export default store;
