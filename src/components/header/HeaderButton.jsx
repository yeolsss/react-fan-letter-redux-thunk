import { useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StHeaderBtnLi } from '../../styles/header/StHeader.js';
import {
  selectorMember,
  setCurrentMember,
} from '../../redux/config/module/member.slice.js';
import { DETAIL_PATH } from '../../common/util.js';

function HeaderButton({ children }) {
  const member = useSelector(selectorMember);
  const match = useMatch(DETAIL_PATH);

  const dispatch = useDispatch();
  const handlerOnClickMemberSelector = (id) => {
    dispatch(setCurrentMember(id));
  };
  return (
    <StHeaderBtnLi
      key={children.id}
      $thisMemberId={children.id === member.currentMember}
    >
      {!match ? (
        <button onClick={() => handlerOnClickMemberSelector(children.id)}>
          {children.name}
        </button>
      ) : (
        <button>{children.name}</button>
      )}
    </StHeaderBtnLi>
  );
}

export default HeaderButton;
