import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';
import {
  StLetterCard,
  StLetterInfo,
} from '../../styles/main/StLetterCardComponent.js';

function LetterCard({ children }) {
  const { currentMember } = useSelector((state) => state.member);

  return (
    <Link to={`/detail/${currentMember}/${children.id}`}>
      <StLetterCard>
        <Avatar imgPath={children.avatar} />
        <StLetterInfo>
          <h1>{children.nickname}</h1>
          <span>{children.createdAt}</span>
          <p>{children.content}</p>
        </StLetterInfo>
      </StLetterCard>
    </Link>
  );
}

export default LetterCard;
