import axios, { InternalAxiosRequestConfig } from 'axios';

import env from './env';
import cookies from 'js-cookie';

// Auth interceptor
// Sends bearer token per request
const authInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
  const token = cookies.get('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// Users api endpoint
export const baseAPI = axios.create({
  baseURL: env.API_URL,
});

baseAPI.interceptors.request.use(authInterceptor);
