import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/enrollments`, { params });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/enrollments/${id}`);
  return response;
};

const store = async ({ employee_id, course_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/major/enrollments`, { employee_id, course_id });
  return response;
};

const update = async ({ employee_id, course_id } = {}) => {
  const response = await interceptors.gateway.patch(`${config.api.gateway}/major/enrollments/${id}`, { employee_id, course_id });
  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/major/enrollments/${id}`);
  return response;
};

export const enrollments = {
  index,
  show,
  store,
  update,
  destroy,
};
