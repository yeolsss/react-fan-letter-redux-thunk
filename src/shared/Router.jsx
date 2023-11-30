import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Detail from '../components/Detail';
import Layout from '../pages/Layout';
import { DETAIL_PATH } from '../common/util';
import { Auth } from '../pages/Auth.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  __getLoginState,
  selectorLoginData,
} from '../redux/config/module/login.slice.js';
import MyProfile from '../components/MyProfile.jsx';
import { useEffect } from 'react';

export const Router = () => {
  const { isLogin } = useSelector(selectorLoginData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getLoginState());
  }, [isLogin.isLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={isLogin ? <Layout /> : <Navigate to={'/login'} />}>
          <Route path="/" element={<Home />} />
          <Route path={DETAIL_PATH} element={<Detail />} />
          <Route path={'/my-profile'} element={<MyProfile />} />
        </Route>

        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};
