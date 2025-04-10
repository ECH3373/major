import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/events`, { params });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/events/${id}`);
  return response;
};

const store = async ({ name, start_date, end_date, trainer_id, course_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/major/events`, { name, start_date, end_date, trainer_id, course_id });
  return response;
};

const update = async ({ name, start_date, end_date, trainer_id, course_id } = {}) => {
  const response = await interceptors.gateway.patch(`${config.api.gateway}/major/events/${id}`, { name, start_date, end_date, trainer_id, course_id });
  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/major/events/${id}`);
  return response;
};

export const events = {
  index,
  show,
  store,
  update,
  destroy,
};
