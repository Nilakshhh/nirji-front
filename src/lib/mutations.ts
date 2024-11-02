import { apiRequest } from './api';
import { endpoints } from './endpoints';
import { arrayBufferToBase64 } from '@/utils/reusables';

export const login = async (username: string, password: string) => {
  return await apiRequest(endpoints.login, 'POST', { username, password });
};

// Function to create registration request
export const register = async (
  username: string,
  email: string,
  password: string,
  dpImage: ArrayBuffer | null
) => {
  const dpImageBase64 = dpImage ? arrayBufferToBase64(dpImage) : null; // Convert ArrayBuffer to Base64
  return await apiRequest(endpoints.register, 'POST', {
      username,
      email,
      password,
      dpImage: dpImageBase64, // Send as Base64
  });
};

export const updateUserDetails = async (
  dpImage: ArrayBuffer,
  id?: string,
  username?: string,
  bio?: string,
) => {
  const dpImageBase64 = arrayBufferToBase64(dpImage); // Convert ArrayBuffer to Base64
  // console.log(dpImageBase64, "dd");
  return await apiRequest(`${endpoints.updateUser}/${id}`, 'PUT', {
    username,
    dpImage: dpImageBase64, // Send as Base64
    bio
  });
};


export const upload_profile_image = async (userId: any, token: any, image: ArrayBuffer | null) => {
  const imageBase64 = image ? arrayBufferToBase64(image) : null; // Convert ArrayBuffer to Base64
  return await apiRequest(`${endpoints.image}`, 'POST', {
      userId,
      image: imageBase64,
  });
};

export const delete_profile_image = async (userId: any, imageId: string) => {
  return await apiRequest(`${endpoints.image}/${imageId}`, 'DELETE', { userId });
};

