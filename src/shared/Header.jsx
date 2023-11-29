import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderButton from '../components/header/HeaderButton';
import {
  StButtonWrapper,
  StHeader,
  StHomeBtn,
  StNav,
} from '../styles/header/StHeader';
import { selectorMember } from '../redux/config/module/member.slice.js';

function Header() {
  const member = useSelector(selectorMember);
  const navigate = useNavigate();

  const handleOnclickHeaderBtn = (type) => {
    if (type === 'home') return navigate('/');
    if (type === 'myProfile') return navigate('/my-profile');
    if (type === 'logout') {
      //logout logic
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
