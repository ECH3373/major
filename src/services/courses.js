import { config } from '@/config';
import { interceptors } from '@/interceptors';
import axios from 'axios';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/courses`, {
    params,
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/courses/courses/${id}`);
  return response;
};

const store = async ({ name, description, image, background, book } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) { }

  try {
    if (name && background) {
      const formData = new FormData();
      formData.append('file', background);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      background = hub?.data?.data?.url;
    }
  } catch (error) { }

  const response = await interceptors.gateway.post(`${config.api.gateway}/courses/courses`, {
    name,
    description,
    image,
    background,
    book,
  });

  return response;
};

const update = async ({ id, name, description, image, background, book } = {}) => {
  try {
    if (name && image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) { }

  try {
    if (name && background) {
      const formData = new FormData();
      formData.append('file', background);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      background = hub?.data?.data?.url;
    }
  } catch (error) { }

  const response = await interceptors.gateway.patch(`${config.api.gateway}/courses/courses/${id}`, {
    name,
    description,
    image,
    background,
    book,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/courses/courses/${id}`);
  return response;
};

export const courses = {
  index,
  show,
  store,
  update,
  destroy,
};
