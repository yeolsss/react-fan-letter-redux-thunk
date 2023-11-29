import { useMatch, useNavigate } from 'react-router-dom';
import SignUp from '../components/anth/SignUp.jsx';
import { useSelector } from 'react-redux';
import {
  selectLogin,
  selectSignUp,
} from '../redux/config/module/auth.slice.js';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Login from '../components/anth/Login.jsx';

export const Auth = () => {
  const match = useMatch('/login');
  const {
    isError: isSignUpError,
    isSuccess: isSignUpSuccess,
    error: signUpError,
  } = useSelector(selectSignUp);
  const navigate = useNavigate();
  const {
    isLoading: isLoginLoading,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
    error: loginError,
    token: accessToken,
  } = useSelector(selectLogin);

  useEffect(() => {
    if (isSignUpSuccess) {
      toast.success('회원가입이 완료되었습니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/login');
    }
    if (isSignUpError) {
      toast.error(`${signUpError}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isSignUpError, isSignUpSuccess]);

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('로그인이 완료되었습니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }

    if (isLoginError) {
      toast.error(`${loginError}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  }, [isLoginLoading, isLoginError, isLoginSuccess, loginError]);

  return (
    <>
      {match && <Login />}
      {!match && <SignUp />}
      <ToastContainer />
    </>
  );
};
