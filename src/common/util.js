import authInstance from '../axios/auth.api.js';

export const DETAIL_PATH = '/detail/:memberId/:id';
export const getMembers = [
  { id: '0', name: '권경열', avatar: '' },
  { id: '1', name: '송용승', avatar: '' },
  { id: '2', name: '최문길', avatar: '' },
  { id: '3', name: '전민석', avatar: '' },
  { id: '4', name: '박유나', avatar: '' },
  { id: '5', name: '이진호', avatar: '' },
  { id: '6', name: '조미래', avatar: '' },
  { id: '7', name: '김명섭', avatar: '' },
];

export function Letter(
  id,
  writeTo,
  nickname,
  content,
  createdAt,
  avatar = '',
  userId,
) {
  this.id = id;
  this.writeTo = writeTo;
  this.nickname = nickname;
  this.content = content;
  this.createdAt = createdAt;
  this.avatar = avatar;
  this.userId = userId;
}

// 날짜 만들기
export const getDate = (setDate = '') => {
  const today = setDate === '' ? new Date() : new Date(setDate);

  const year = String(today.getFullYear()); // 년도
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월
  const date = String(today.getDate()).padStart(2, '0'); // 날짜
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
};

export const validData = (state, msg, ref) => {
  if (state.replaceAll(' ', '') === '') {
    alert(`${msg}을 입력해주세요.`);
    ref.current.focus();
    return true;
  }
  return false;
};

export const checkToken = async () => {
  // localStorage에 있는 토큰 가져옴
  const accessToken = localStorage.getItem('accessToken');

  // 토큰이 없으면 오류를 반환 및 처리
  if (!accessToken) {
    return false;
  }
  authInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;

  // 있다면 토큰을 검증.
  try {
    await authInstance.get('/user');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
