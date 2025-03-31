import { config } from '@/config';
import { interceptors } from '@/interceptors';
import Cookies from 'js-cookie';

const login = async ({ username } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/login`, {
    username,
    password: config.app.id,
  });

  if (response?.data?.access_token) Cookies.set('access_token', response?.data?.access_token, { expires: 7 });
  if (response?.data?.refresh_token) Cookies.set('refresh_token', response?.data?.refresh_token, { expires: 7 });

  return response;
};

const me = async () => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/me`);
  return response;
};

export const auth = {
  login,
  me,
};
