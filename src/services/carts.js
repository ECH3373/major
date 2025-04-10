import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/store/carts`, { params });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/store/carts/${id}`);
  return response;
};

const store = async ({ quantity, product_id, employee_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/store/carts`, { quantity, product_id, employee_id });
  return response;
};

const update = async ({ quantity, product_id, employee_id } = {}) => {
  const response = await interceptors.gateway.patch(`${config.api.gateway}/store/carts/${id}`, { quantity, product_id, employee_id });
  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/store/carts/${id}`);
  return response;
};

export const carts = {
  index,
  show,
  store,
  update,
  destroy,
};
