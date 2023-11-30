import {
  StButton,
  StButtonWrapper,
  StImgButton,
  StInput,
  StMyProfileWrapper,
} from '../styles/myProfile.js';
import Avatar from './Avatar.jsx';
import {
  selectorLoginData,
  setLogin,
} from '../redux/config/module/login.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import api from '../axios/auth.api.js';
import { printError } from '../redux/config/module/error.slice.js';
import { printSuccess } from '../redux/config/module/success.slice.js';
import { setIsLoading } from '../redux/config/module/loading.slice.js';

const MyProfile = () => {
  const { userInstance } = useSelector(selectorLoginData);
  const [updateState, setUpdateState] = useState(false);
  const [updateNickName, setUpdateNickName] = useState(userInstance.nickname);
  const [avatar, setAvatar] = useState(userInstance.avatar);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleOnClickUpdateState = () => {
    setUpdateState(!updateState);
  };
  const handleOnChangeNickName = (e) => {
    setUpdateNickName(e.currentTarget.value);
  };
  const handleOnClickUpdateCancel = () => {
    setUpdateNickName(userInstance.nickname);
    setAvatar(userInstance.avatar);
    setUpdateState(false);
  };

  const handleOnClickSelectImage = () => {
    imageInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnClickUpdate = async () => {
    if (updateNickName.trim() === '') {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    const confirmResult = confirm('수정 하시겠습니까?');
    if (!confirmResult) return;

    dispatch(setIsLoading(true));
    const formData = new FormData();
    formData.append('nickname', updateNickName);
    // 이미지 추가 로직
    if (imageInputRef.current.files[0]) {
      formData.append('avatar', imageInputRef.current.files[0]);
    }

    try {
      const response = await api.patch(`/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInstance.accessToken}`,
        },
      });
      dispatch(
        printSuccess({
          isSuccess: true,
          successMessage: response.data.message,
        }),
      );

      setUpdateNickName(updateNickName);
      setUpdateState(!updateState);
      setAvatar(response.data.avatar);
      dispatch(setIsLoading(false));
      dispatch(
        setLogin({
          ...userInstance,
          nickname: updateNickName,
          avatar: response.data.avatar,
        }),
      );
    } catch (error) {
      dispatch(
        printError({
          isError: true,
          errorMessage: '프로필 업데이트에 실패했습니다.',
        }),
      );
      dispatch(setIsLoading(false));
    }
  };

  return (
    <StMyProfileWrapper>
      <div>
        <h1>프로필관리</h1>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={imageInputRef}
          accept={'image/*'}
          onChange={handleFileChange}
        />

        {updateState ? (
          <>
            <StImgButton onClick={handleOnClickSelectImage}>
              <Avatar imgPath={avatar} />
            </StImgButton>
            <StInput
              type="text"
              value={updateNickName}
              onChange={handleOnChangeNickName}
            />
          </>
        ) : (
          <>
            <Avatar imgPath={avatar} />
            <p>{updateNickName}</p>
          </>
        )}
        <p>{userInstance.userId}</p>

        {updateState ? (
          <StButtonWrapper>
            <StButton onClick={handleOnClickUpdateCancel}>취소</StButton>
            <StButton onClick={handleOnClickUpdate}>수정완료</StButton>
          </StButtonWrapper>
        ) : (
          <StButton onClick={handleOnClickUpdateState}>수정하기</StButton>
        )}
      </div>
    </StMyProfileWrapper>
  );
};
export default MyProfile;
