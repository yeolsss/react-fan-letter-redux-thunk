import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import MultiButton from '../MultiButton';
import { StForm, StNickName, StSelector } from '../../styles/StInputForm.js';
import { Letter, getDate, validData } from '../../common/util';
import { __addLetter } from '../../redux/config/module/letter.slice.js';
import { setCurrentMember } from '../../redux/config/module/member.slice.js';
import { selectorLoginData } from '../../redux/config/module/login.slice.js';

function LetterForm() {
  const member = useSelector((state) => state.member);
  const { userInstance } = useSelector(selectorLoginData);

  // * letter content state
  const [letterContent, setLetterContent] = useState('');
  // * member selectbox state 멤버 셀렉트 박스 선택
  const [memberSelectBox, setMemberSelectBox] = useState();

  // * set ref
  const letterContentRef = useRef(null);

  const dispatch = useDispatch();

  const onChangeLetterContent = (e) => {
    setLetterContent(e.target.value);
  };

  // selectbox controll
  const onChangeMemberSelectBox = (e) => {
    const memberId = e.target.value;
    dispatch(setCurrentMember(memberId));
    setMemberSelectBox(memberId);
  };

  // letter 등록
  const onSubmitLetter = (e) => {
    e.preventDefault();

    // 빈값 유효성 검사
    if (validData(letterContent, '내용', letterContentRef)) return;

    const id = uuidv4();
    const memberId = member.currentMember;
    const letter = new Letter(
      id,
      memberId,
      userInstance.nickname,
      letterContent,
      getDate(),
      userInstance.avatar,
      userInstance.userId,
    );

    dispatch(__addLetter(letter));

    setLetterContent('');
  };

  useEffect(() => {
    setMemberSelectBox(member.currentMember);
  }, [member.currentMember]);
  return (
    <StForm onSubmit={onSubmitLetter}>
      <StSelector>
        <span>to:</span>
        <select
          defaultValue={memberSelectBox}
          value={memberSelectBox}
          onChange={onChangeMemberSelectBox}
        >
          {member.getMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <div>
          <MultiButton name={'등록'} />
        </div>
      </StSelector>
      <StNickName>닉네임: {userInstance.nickname}</StNickName>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        value={letterContent}
        onChange={onChangeLetterContent}
        ref={letterContentRef}
        maxLength={100}
        placeholder="내용 : 최대 100글자까지 작성할 수 있습니다."
      ></textarea>
    </StForm>
  );
}

export default LetterForm;
