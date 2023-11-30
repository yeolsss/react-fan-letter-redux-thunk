import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/header/HeaderButton';
import {
  StButtonWrapper,
  StHeader,
  StHomeBtn,
  StNav,
} from '../styles/header/StHeader.js';
import { selectorMember } from '../redux/config/module/member.slice.js';
import { printSuccess } from '../redux/config/module/success.slice.js';

function Header() {
  const member = useSelector(selectorMember);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnclickHeaderBtn = (type) => {
    if (type === 'home') return navigate('/');
    if (type === 'myProfile') return navigate('/my-profile');
    if (type === 'logout') {
      //logout logic
      dispatch(
        printSuccess({
          isSuccess: true,
          successMessage: '로그아웃!',
        }),
      );
      localStorage.setItem('accessToken', '');
      navigate('/login');
    }
  };

  return (
    <StHeader>
      <StButtonWrapper>
        <StHomeBtn onClick={() => handleOnclickHeaderBtn('home')}>
          홈으로
        </StHomeBtn>
        <StHomeBtn onClick={() => handleOnclickHeaderBtn('myProfile')}>
          마이페이지
        </StHomeBtn>
        <StHomeBtn onClick={() => handleOnclickHeaderBtn('logout')}>
          로그아웃
        </StHomeBtn>
      </StButtonWrapper>
      <h1>판교행버스</h1>
      <div>
        <div></div>
      </div>
      <StNav>
        <ul>
          {member.getMembers.map((member) => (
            <HeaderButton key={member.id}>{member}</HeaderButton>
          ))}
        </ul>
      </StNav>
    </StHeader>
  );
}

export default React.memo(Header);
