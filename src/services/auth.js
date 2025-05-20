import { config } from '@/config';
import { interceptors } from '@/interceptors';
import Cookies from 'js-cookie';

const login = async ({ username } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/auth/login`, {
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

const register = async ({ employee_id }) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/register`, {
    employee_id,
    app_id: config.app.id,
    role_id: 'cf4eb7cc-3ebf-4d0c-8be4-fd46107dea61'
  });
  return response;
};

export const auth = {
  login,
  me,
  register
};
