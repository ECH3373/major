import { config } from '@/config';
import { interceptors } from '@/interceptors';
import axios from 'axios';

const index = async ({ page, limit, search, filters, order } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/courses`, {
    params: { page, limit, search, filters, order },
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/courses/${id}`);
  return response;
};

const store = async ({ name, description, image } = {}) => {
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

  const response = await interceptors.gateway.post(`${config.api.gateway}/major/courses`, {
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

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) {}

  const response = await interceptors.gateway.patch(`${config.api.gateway}/major/courses/${id}`, {
    name,
    description,
    image,
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/major/courses/${id}`);
  return response;
};

export const courses = {
  index,
  show,
  store,
  update,
  destroy,
};
