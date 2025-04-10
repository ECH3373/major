import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/store/products`, { params });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/store/products/${id}`);
  return response;
};

const store = async ({ sku, name, description, set, image } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/store/products`, { sku, name, description, set, image });
  return response;
};

const update = async ({ sku, name, description, set, image } = {}) => {
  const response = await interceptors.gateway.patch(`${config.api.gateway}/store/products/${id}`, { sku, name, description, set, image });
  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/store/products/${id}`);
  return response;
};

export const products = {
  index,
  show,
  store,
  update,
  destroy,
};
