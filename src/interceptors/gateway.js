import { config } from '@/config';
import axios from 'axios';
import Cookies from 'js-cookie';

// create instance of axios
export const gateway = axios.create({ baseURL: config.api.gateway });

// create interceptor
gateway.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get('access_token');
    if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },

  (error) => Promise.resolve(error),
);

// interceptor configs
gateway.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const request = error.config;

    if (request.url && request.url.includes('/auth/refresh')) {
      return Promise.resolve(error);
    }

    if (error.response && error.response.status === 401 && !request._retry) {
      request._retry = true;

      try {
        const refresh_token = Cookies.get('refresh_token');
        const { data } = await gateway.post('/refresh', { refresh_token });
        const new_access_token = data.access_token;
        Cookies.set('access_token', new_access_token);
        gateway.defaults.headers.common['Authorization'] = `Bearer ${new_access_token}`;
        request.headers['Authorization'] = `Bearer ${new_access_token}`;
        return gateway(request);
      } catch (error) {
        //window.location.href = '/login';
        return Promise.resolve(error);
      }
    } else {
      //window.location.href = '/login';
    }

    return Promise.resolve(error.response.data);
  },
);
