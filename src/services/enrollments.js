import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ page, limit, search, filters, order } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/enrollments`, { params: { page, limit, search, filters, order } });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/enrollments/${id}`);
  return response;
};

const store = async ({ employee_id, course_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/enrollments`, { employee_id, course_id });
  return response;
};

const update = async ({ employee_id, course_id } = {}) => {
  const response = await interceptors.gateway.patch(`${config.api.gateway}/enrollments/${id}`, { employee_id, course_id });
  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/enrollments/${id}`);
  return response;
};

export const enrollments = {
  index,
  show,
  store,
  update,
  destroy,
};
