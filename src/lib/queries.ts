import { apiRequest } from './api';
import { endpoints } from './endpoints';

export const all_users = async () => {
    return await apiRequest(endpoints.users, 'GET');
  };
export const user_details = async (id: any) => {
    return await apiRequest(`${endpoints.userdetails}/${id}`, 'GET');
  };