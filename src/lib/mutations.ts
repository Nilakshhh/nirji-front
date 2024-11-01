import { apiRequest } from './api';
import { endpoints } from './endpoints';

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

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
