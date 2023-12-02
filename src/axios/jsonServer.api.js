import axios from 'axios';
import { checkToken } from '../common/util.js';

// json server
const jsonServerInstance = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER,
});

jsonServerInstance.get(`/letters`);
jsonServerInstance.interceptors.request.use(
  async (config) => {
    const tokenResult = await checkToken();
    if (tokenResult.success) {
      return config;
    } else {
      return Promise.reject(tokenResult.error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

jsonServerInstance.interceptors.response.use(
  async (config) => {
    const tokenResult = await checkToken();
    if (tokenResult.success) {
      return config;
    } else {
      return Promise.reject(tokenResult.error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default jsonServerInstance;
