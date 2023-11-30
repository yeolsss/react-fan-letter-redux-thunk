import axios from 'axios';
import { checkToken } from '../common/util.js';

// json server
const jsonServerInstance = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER,
});

jsonServerInstance.interceptors.request.use(
  async (config) => {
    if (await checkToken()) {
      return config;
    } else {
      return new Error('Not Token found');
    }
  },
  async (error) => {
    return Promise.reject(error);
  },
);

jsonServerInstance.interceptors.response.use(
  async (config) => {
    if (await checkToken()) {
      return config;
    } else {
      return new Error('Not Token found');
    }
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default jsonServerInstance;
