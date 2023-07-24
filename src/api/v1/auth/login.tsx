import { baseAPI } from '@/config/axios';
import cookies from 'js-cookie';

export const login = async (data: any) => {
  await baseAPI
    .post('/user/login', data)
    .then((res) => {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;

      console.log(res.data);
      cookies.set('accessToken', res.data.data.accesstoken, {
        expires: expiresIn,
      });
      return res.data;
    })
    .catch((err) => err);
};

export const registerUser = async (data: any) => {
  await baseAPI.post('/user/register', data).then((res) => {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = {
      name: 'accessToken',
      value: res.data.data.token,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };
    cookies.set('accessToken', res.data.data.accesstoken, options);
  });
};
