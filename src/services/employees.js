import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/employees`, { params });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/employees/${id}`);
  return response;
};

export const employees = {
  index,
  show,
};
