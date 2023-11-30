import { StAvatarWrapper } from '../styles/StAvatar.js';
import avatar from '../assets/download.png';

function Avatar({ imgPath }) {
  return (
    <StAvatarWrapper>
      <img src={imgPath !== '' ? imgPath : avatar} />
    </StAvatarWrapper>
  );
}

export default Avatar;
