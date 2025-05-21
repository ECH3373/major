import { config } from '@/config';
import { interceptors } from '@/interceptors';
import axios from 'axios';

const index = async ({ params = {} } = {}) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/images`, {
    params,
  });
  return response;
};

const show = async ({ id }) => {
  const response = await interceptors.gateway.get(`${config.api.gateway}/major/images/${id}`);
  return response;
};

const store = async ({ image } = {}) => {
  try {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) { }

  const response = await interceptors.gateway.post(`${config.api.gateway}/major/images`, {
    url: image
  });

  return response;
};

const update = async ({ image } = {}) => {
  try {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
    }
  } catch (error) { }

  const response = await interceptors.gateway.patch(`${config.api.gateway}/major/images/${id}`, {
    url: image
  });

  return response;
};

const destroy = async ({ id } = {}) => {
  const response = await interceptors.gateway.delete(`${config.api.gateway}/major/images/${id}`);
  return response;
};

export const login = {
  index,
  show,
  store,
  update,
  destroy,
};
