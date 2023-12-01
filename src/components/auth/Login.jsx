import { Link, useNavigate } from 'react-router-dom';
import ShardInput from '../../shared/ShardInput.jsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/ReactToastify.min.css';
import {
  StButton,
  StForm,
  StTitle,
  StWrapper,
} from '../../styles/auth/Auth.js';
import api from '../../axios/auth.api.js';
import { setLogin } from '../../redux/config/module/login.slice.js';
import { printError } from '../../redux/config/module/error.slice.js';
import { printSuccess } from '../../redux/config/module/success.slice.js';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const handleOnChangeLogin = (e, type) => {
    setSignUpState({
      ...signUpState,
      [type]: e.target.value,
    });
  };

  const handleOnSubmitLogin = async (event) => {
    event.preventDefault();
    const newLoginUser = {
      id: signUpState.id,
      password: signUpState.password,
    };

    try {
      const response = await api.post('/login', newLoginUser);
      dispatch(setLogin(response.data));
      dispatch(
        printSuccess({
          isSuccess: true,
          successMessage: '로그인이 되었습니다.',
        }),
      );
      navigate('/');
    } catch (error) {
      dispatch(
        printError({
          isError: true,
          errorMessage: error.response.data.message,
        }),
      );
      console.error(error);
    }
  };

  return (
    <>
      <StWrapper>
        <div>
          <StTitle>로그인</StTitle>
          <StForm onSubmit={handleOnSubmitLogin}>
            <ShardInput
              type="text"
              value={signUpState.id}
              onChange={handleOnChangeLogin}
              minLength={4}
              maxLength={10}
              placeholder={'아이디 (4~10글자)'}
              inputType={'id'}
            />
            <ShardInput
              type="password"
              value={signUpState.password}
              onChange={handleOnChangeLogin}
              minLength={4}
              maxLength={15}
              placeholder={'비밀번호 (4~15글자)'}
              inputType={'password'}
            />
            <StButton>로그인</StButton>
          </StForm>
          <Link to={'/signup'}>회원가입</Link>
        </div>
      </StWrapper>
    </>
  );
};
export default Login;
