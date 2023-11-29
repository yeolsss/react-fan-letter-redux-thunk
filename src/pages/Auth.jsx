import { useMatch, useNavigate } from 'react-router-dom';
import SignUp from '../components/anth/SignUp.jsx';
import { useSelector } from 'react-redux';
import { selectSignUp } from '../redux/config/module/auth.slice.js';
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

  return (
    <>
      {match && <Login />}
      {!match && <SignUp />}
      <ToastContainer />
    </>
  );
};
