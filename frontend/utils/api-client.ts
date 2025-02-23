import api from "@/config/api";

export const apiClient = async (endpoint: string, options: RequestInit) => {
  const response = await fetch(`${api.API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  const data = await response.json();
  
  if (response.status !== 200) {
    throw new Error(data.detail);
  }
  
  return data;
};