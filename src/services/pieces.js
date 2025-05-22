import { config } from "@/config";
import { interceptors } from "@/interceptors";

const store = async ({ resource_id, employee_id } = {}) => {
  const response = await interceptors.gateway.post(`${config.api.gateway}/major/pieces`, {
    resource_id,
    employee_id
  });

  return response;
};

export const pieces = {
  store,
};
