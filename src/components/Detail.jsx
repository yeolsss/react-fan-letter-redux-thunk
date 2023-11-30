import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import {
  StButtonWrapper,
  StContentForm,
  StDetailContainer,
  StMemberNameWrapper,
  StWriterInfoWrapper,
} from '../styles/detail/StDetail.js';
import { validData } from '../common/util';
import { setCurrentMember } from '../redux/config/module/member.slice.js';
import { printError } from '../redux/config/module/error.slice.js';
import api from '../axios/jsonServer.api.js';
import { printSuccess } from '../redux/config/module/success.slice.js';
import { selectorLoginData } from '../redux/config/module/login.slice.js';

function Detail() {
  const { userInstance } = useSelector(selectorLoginData);
  const { id: paramId, memberId } = useParams();
  const dispatch = useDispatch();

  const [letter, setLetter] = useState({
    id: '',
    writedTo: '',
    nickname: '',
    content: '',
    createdAt: '',
    avatar: '',
  });

  const { id, writedTo, nickname, content, createdAt, avatar, userId } = letter;

  useEffect(() => {
    dispatch(setCurrentMember(memberId));
  }, []);

  const members = useSelector((state) => state.member);

  // * useHistory1
  const navigate = useNavigate();

  // * letter update textarea state
  const [letterUpdateContent, setLetterUpdateContent] = useState();

  // * letter update btn state
  const [updateState, setUpdateState] = useState(false);

  const updateLetterContentRef = useRef(null);

  const member = members.getMembers[Number(writedTo)];
  const { name } = member;

  const handleOnSubmitDeleteLetter = async (e) => {
    const confirmResult = confirm('삭제 하시겠습니까?');
    if (!confirmResult) return;

    try {
      await api.delete(`/letters/${paramId}`);
      dispatch(
        printError({
          isError: true,
          errorMessage: '삭제되었습니다.',
        }),
      );
      navigate('/');
    } catch (error) {
      dispatch(
        printError({
          isError: true,
          errorMessage: '삭제가 실패했습니다.',
        }),
      );
    }
  };
  // letter 수정
  const handleOnChangeUpdateLetter = (e) => {
    setLetterUpdateContent(e.target.value);
  };

  const handleOnSubmitUpdateLetter = async (e) => {
    e.preventDefault();
    if (validData(letterUpdateContent, '내용', updateLetterContentRef)) return;

    try {
      const response = api.patch(`/letters/${paramId}`, {
        content: letterUpdateContent,
      });
      setLetter({ ...letter, content: letterUpdateContent });
      dispatch(
        printSuccess({
          isSuccess: true,
          successMessage: '글 수정이 완료되었습니다.',
        }),
      );
    } catch (error) {
      dispatch(
        printError({
          isError: true,
          errorMessage: '수정에 실패하였습니다.',
        }),
      );
    }

    setUpdateState(false);
  };

  // letter 수정 버튼
  const handleOnClickUpdateBtn = () => {
    setUpdateState(true);
  };

  // json server data
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/letters?id=${paramId}`);
        setLetterUpdateContent(response.data[0].content);
        setLetter({ ...response.data[0] });
      } catch (error) {
        dispatch(
          printError({
            isError: true,
            errorMessage: error,
          }),
        );
      }
    })();
  }, []);

  return (
    <StDetailContainer>
      <div>
        <StWriterInfoWrapper>
          <div>
            <Avatar imgPath={avatar} />
            <h1>{nickname}</h1>
          </div>
          <span> {createdAt}</span>
        </StWriterInfoWrapper>

        <StMemberNameWrapper>
          <span>to: {name}</span>
        </StMemberNameWrapper>

        <StContentForm>
          {updateState ? (
            <textarea
              maxLength={100}
              value={letterUpdateContent}
              onChange={handleOnChangeUpdateLetter}
              ref={updateLetterContentRef}
            ></textarea>
          ) : (
            <p>{content.replaceAll('<br>', '\n')}</p>
          )}
        </StContentForm>
        {userInstance.userId === userId ? (
          <StButtonWrapper>
            {updateState ? (
              <Button
                dataId={id}
                handler={handleOnSubmitUpdateLetter}
                btnTitle={'완료'}
              />
            ) : (
              <Button btnTitle={'수정'} handler={handleOnClickUpdateBtn} />
            )}

            <Button
              dataId={id}
              btnTitle={'삭제'}
              handler={handleOnSubmitDeleteLetter}
            />
          </StButtonWrapper>
        ) : null}
      </div>
    </StDetailContainer>
  );
}

export default Detail;

const Button = ({ btnTitle, handler, dataId = '' }) => (
  <button data-id={dataId} onClick={handler}>
    {btnTitle}
  </button>
);
