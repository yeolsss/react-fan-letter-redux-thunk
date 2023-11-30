import axios from 'axios';
export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_BASE_URL,
});

export default authInstance;
