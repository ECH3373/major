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
      const formDataImage = new FormData();
      formDataImage.append('file', image);
      const formDataBg = new FormData();
      formDataBg.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const hub_2 = await axios.post(`${config.api.hub}/hub`, formDataBg, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
      background = hub?.data?.data?.hub_2;
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
      const formDataImage = new FormData();
      formDataImage.append('file', image);
      const formDataBg = new FormData();
      formDataBg.append('file', image);

      const hub = await axios.post(`${config.api.hub}/hub`, formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const hub_2 = await axios.post(`${config.api.hub}/hub`, formDataBg, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      image = hub?.data?.data?.url;
      background = hub?.data?.data?.hub_2;
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
