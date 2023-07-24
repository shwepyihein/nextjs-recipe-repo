import { baseAPI } from '@/config/axios';
import cookies from 'js-cookie';

export const login = async (data: any) => {
  return await baseAPI.post('/user/login', data);
};

export const registerUser = async (data: any) => {
  return await baseAPI.post('/user/signup', data);
};
