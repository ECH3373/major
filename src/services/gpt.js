import { config } from '@/config';
import { interceptors } from '@/interceptors';

const chat = async ({ prompt, role = 'user', content, history = [], tools = [] } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/gpt/chat`, { prompt, role, content, history, tools });
  return response;
};

export const gpt = {
  chat
};
