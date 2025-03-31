import { config } from '@/config';
import { interceptors } from '@/interceptors';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/modules`, {
    params,
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/modules/${id}`);
  return response;
};

const store = async ({ course_id, name, description, image, order } = {}) => {
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

  const response = await interceptors.gateway.post(`${config.api.gateway}/modules`, {
    course_id,
    name,
    description,
    image,
    order,
  });

  return response;
};

const update = async ({ id, name, description, image, order } = {}) => {
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

  const response = await interceptors.gateway.patch(`${config.api.gateway}/modules/${id}`, {
    name,
    description,
    image,
    order,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/modules/${id}`);
  return response;
};

export const modules = {
  index,
  show,
  store,
  update,
  destroy,
};
