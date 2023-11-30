import { StAvatarWrapper } from '../styles/StAvatar.js';

function Avatar({ imgPath }) {
  return (
    <StAvatarWrapper>
      <img
        src={imgPath !== '' ? imgPath : '/assets/download.png'}
        alt={'프로필 이미지'}
      />
    </StAvatarWrapper>
  );
}

export default Avatar;
