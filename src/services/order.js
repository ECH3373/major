import { config } from '@/config';
import { interceptors } from '@/interceptors';
import { events } from './events';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/store/orders`, { params });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/store/orders/${id}`);
  return response;
};

const store = async ({ employee_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/store/orders`, { employee_id });
  return response;
};

export const orders = {
  index,
  show,
  store,
};
