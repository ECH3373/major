import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ page, limit, search, filters, order } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses`, {
    params: { page, limit, search, filters, order },
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/${id}`);
  return response;
};

const store = async ({ name, description, image } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await interceptors.gateway.post(`${config.api.gateway}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.post(`${config.api.gateway}/courses`, {
    name,
    description,
    image,
  });

  return response;
};

const update = async ({ id, name, description, image } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await interceptors.gateway.post(`${config.api.gateway}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.patch(`${config.api.gateway}/courses/${id}`, {
    name,
    description,
    image,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/courses/${id}`);
  return response;
};

export const courses = {
  index,
  show,
  store,
  update,
  destroy,
};
