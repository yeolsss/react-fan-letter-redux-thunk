import { Link } from 'react-router-dom';
import ShardInput from '../../shared/ShardInput.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  __signUp,
  selectSignUp,
} from '../../redux/config/module/auth.slice.js';
import 'react-toastify/ReactToastify.min.css';
import { StButton, StForm, StTitle, StWrapper } from './style.js';
import { setIsLoading } from '../../redux/config/module/loading.slice.js';

const SignUp = () => {
  const dispatch = useDispatch();
  const [signUpState, setSignUpState] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const { isLoading, isError, error } = useSelector(selectSignUp);

  const handleOnChangeSignUp = (e, type) => {
    setSignUpState({
      ...signUpState,
      [type]: e.target.value,
    });
  };

  const handleOnSubmitSignUp = (event) => {
    event.preventDefault();
    const newSignUpUser = {
      id: signUpState.id,
      password: signUpState.password,
      nickname: signUpState.nickname,
    };
    dispatch(__signUp(newSignUpUser));
  };
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      <StWrapper>
        <div>
          <StTitle>회원가입</StTitle>
          <StForm onSubmit={handleOnSubmitSignUp}>
            <ShardInput
              type="text"
              value={signUpState.id}
              onChange={handleOnChangeSignUp}
              minLength={4}
              maxLength={10}
              placeholder={'아이디 (4~10글자)'}
              inputType={'id'}
            />
            <ShardInput
              type="password"
              value={signUpState.password}
              onChange={handleOnChangeSignUp}
              minLength={4}
              maxLength={15}
              placeholder={'비밀번호 (4~15글자)'}
              inputType={'password'}
            />
            <ShardInput
              type="text"
              value={signUpState.nickname}
              onChange={handleOnChangeSignUp}
              minLength={1}
              maxLength={10}
              placeholder={'닉네임 (1~10글자)'}
              inputType={'nickname'}
            />
            <StButton>회원가입</StButton>
          </StForm>
          <Link to={'/login'}>로그인</Link>
        </div>
      </StWrapper>
    </>
  );
};

export default SignUp;
