import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/lessons`, {
    params,
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/lessons/${id}`);
  return response;
};

const store = async ({ name, description, image, module_id, file, duration_seconds, order } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.post(`${config.api.gateway}/courses/lessons`, {
    name,
    description,
    image,
    module_id,
    file,
    duration_seconds,
    order,
  });

  return response;
};

const update = async ({ id, name, description, image, file, duration_seconds, order } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.patch(`${config.api.gateway}/courses/lessons/${id}`, {
    name,
    description,
    image,
    file,
    duration_seconds,
    order,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/courses/lessons/${id}`);
  return response;
};

export const lessons = {
  index,
  show,
  store,
  update,
  destroy,
};
