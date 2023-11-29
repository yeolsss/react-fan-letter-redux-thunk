import { Link } from 'react-router-dom';
import ShardInput from '../../shared/ShardInput.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/ReactToastify.min.css';
import { StButton, StForm, StTitle, StWrapper } from './style.js';
import api from '../../axios/auth.api.jsx';
import {
  selectorLoginData,
  setLogin,
} from '../../redux/config/module/login.slice.js';
import { printError } from '../../redux/config/module/error.slice.js';

const Login = () => {
  const dispatch = useDispatch();

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
    // 비동기 처리
    try {
      const response = await api.post('/login', newLoginUser);
      dispatch(setLogin(response.data));
    } catch (error) {
      dispatch(printError({ isError: true, errorMessage: error.message }));
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
