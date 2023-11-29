import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShardInput from '../shared/ShardInput.jsx';
import { useState } from 'react';

const SignUp = () => {
  const [signUpState, setSignUpState] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const handleOnChangeSignUp = (e, type) => {
    setSignUpState({
      ...signUpState,
      [type]: e.target.value,
    });
  };

  return (
    <StWrapper>
      <div>
        <StTitle>회원가입</StTitle>
        <StForm>
          <ShardInput
            type="text"
            value={signUpState.id}
            onChange={handleOnChangeSignUp}
            minLength={4}
            maxLength={10}
            placeholder={'아이디 (4~10글자)'}
            input
          />
          <ShardInput
            type="password"
            value={signUpState.password}
            onChange={handleOnChangeSignUp}
            minLength={4}
            maxLength={15}
            placeholder={'비밀번호 (4~15글자)'}
          />
          <ShardInput
            type="text"
            value={signUpState.nickname}
            onChange={handleOnChangeSignUp}
            minLength={1}
            maxLength={10}
            placeholder={'닉네임 (1~10글자)'}
          />
          <StButton>회원가입</StButton>
        </StForm>
        <Link to={'/signin'}>로그인</Link>
      </div>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  > div {
    width: 60rem;
    height: auto;
    margin: auto;
    background-color: var(--text-color);
    padding: 3rem;
    border-radius: 0.5rem;
    > a {
      margin-top: 2rem;
      display: block;
      color: var(--bg-color);
      text-align: center;
      font-size: 2.4rem;
      transition: color 0.2s ease-in;
      &:hover {
        color: var(--btn-selected);
      }
    }
  }
`;
const StTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--bg-color);
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;

const StButton = styled.button`
  width: 100%;
  padding: 2rem 0;
  border: 0.1rem solid var(--bg-color);
  transition:
    background-color 0.2s ease-in,
    color 0.2s ease-in;
  border-radius: 0.5rem;
  font-size: 2.4rem;
  font-weight: 700;

  &:hover {
    background: var(--text-color);
    color: var(--bg-color);
  }
`;
export default SignUp;
