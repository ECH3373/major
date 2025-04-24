import { config } from '@/config';
import { interceptors } from '@/interceptors';
import axios from 'axios';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/modules`, {
    params,
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/modules/${id}`);
  return response;
};

const store = async ({ course_id, name, description, image, background, order } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) {}

  try {
    if (name && background) {
      const formData = new FormData();
      formData.append('file', background);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      background = hub?.data?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.post(`${config.api.gateway}/courses/modules`, {
    course_id,
    name,
    description,
    image,
    background,
    order,
  });

  return response;
};

const update = async ({ id, name, description, image, background, order } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) {}

  try {
    if (name && background) {
      const formData = new FormData();
      formData.append('file', background);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      background = hub?.data?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.patch(`${config.api.gateway}/courses/modules/${id}`, {
    name,
    description,
    image,
    background,
    order,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/courses/modules/${id}`);
  return response;
};

export const modules = {
  index,
  show,
  store,
  update,
  destroy,
};
