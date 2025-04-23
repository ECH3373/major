import { config } from '@/config';
import { interceptors } from '@/interceptors';
import axios from 'axios';

const show = async ({ id }) => {
  const token = localStorage.getItem('access_token');

  const response = await axios.get(`${config.api.gateway}/store/invoices/${id}`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `factura_${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);

  return response;
};

export const invoices = {
  show,
};
