import authInstance from '../axios/auth.api.jsx';
import { useDispatch } from 'react-redux';

export const DETAIL_PATH = '/detail/:memberId/:id';
export const getMembers = [
  new Member('0', '권경열', ''),
  new Member('1', '송용승', ''),
  new Member('2', '최문길', ''),
  new Member('3', '전민석', ''),
  new Member('4', '박유나', ''),
  new Member('5', '이진호', ''),
  new Member('6', '조미래', ''),
  new Member('7', '김명섭', ''),
];
function Member(id, name, avatar) {
  this.id = id;
  this.name = name;
  this.avatar = avatar;
}

export function Letter(
  id,
  writedTo,
  nickname,
  content,
  createdAt,
  avatar = '',
) {
  this.id = id;
  this.writedTo = writedTo;
  this.nickname = nickname;
  this.content = content;
  this.createdAt = createdAt;
  this.avatar = avatar;
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
    const response = await authInstance.get('/user');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
