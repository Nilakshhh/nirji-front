const API_URL = process.env.NEXT_PUBLIC_API_URL; // Adjust the API URL as needed

export const apiRequest = async (endpoint: string, method: string, body?: any) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
