import axios from 'axios';
export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_BASE_URL,
  // withCredentials: true,
});

/*authInstance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  (config) => {
    return config;
  },
  // 오류 요청을 보내기 전 수행되는 함수
  (error) => {
    return Promise.reject(error);
  },
);
authInstance.interceptors.response.use(
  // 응답을 내보내기 전 수횅되는 함수
  (response) => {
    return response;
  },
  // 오류 응답을 내보내기 전 수행되는 함수
  (error) => {
    return Promise.reject(error);
  },
);*/
export default authInstance;
