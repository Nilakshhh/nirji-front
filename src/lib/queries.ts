import { apiRequest } from './api';
import { endpoints } from './endpoints';

export const all_users = async () => {
    return await apiRequest(endpoints.users, 'GET');
  };