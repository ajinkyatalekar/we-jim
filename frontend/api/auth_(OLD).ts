import { AuthCredentials } from "@/types/auth";
import { apiClient } from "@/utils/api-client";

export const auth = {
  signup: async (credentials: AuthCredentials) => {
    try {
      return await apiClient('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.error('Auth Error:', error);
      throw error;
    }
  },

  login: async (credentials: AuthCredentials) => {
    try {
      return await apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.error('Auth Error:', error);
      throw error;
    }
  }
};