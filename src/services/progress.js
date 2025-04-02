import { config } from '@/config';
import { interceptors } from '@/interceptors';

const store = async ({ employee_id, lesson_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/major/progress`, { employee_id, lesson_id });

  return response;
};

export const progress = {
  store,
};
