import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/resources`, {
    params,
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/resources/${id}`);
  return response;
};

const store = async ({ name, description, image, lesson_id, quantity } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await interceptors.gateway.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.post(`${config.api.gateway}/courses/resources`, {
    name,
    description,
    image,
    lesson_id,
    quantity,
  });

  return response;
};

const update = async ({ id, name, description, image, quantity } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await interceptors.gateway.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.patch(`${config.api.gateway}/courses/resources/${id}`, {
    name,
    description,
    image,
    quantity,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/courses/resources/${id}`);
  return response;
};

export const resources = {
  index,
  show,
  store,
  update,
  destroy,
};
