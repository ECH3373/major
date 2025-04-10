import { config } from '@/config';
import { interceptors } from '@/interceptors';
import axios from 'axios';

const show = async ({ id }) => {
  console.log(`${config.api.gateway}/store/invoices/${id}`);
  const response = await axios.get(`${config.api.gateway}/store/invoices/${id}`);
  return response;
};

export const invoices = {
  show,
};
