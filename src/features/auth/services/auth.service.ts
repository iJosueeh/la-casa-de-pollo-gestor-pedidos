import { apiClient } from '@/shared/utils/apiClient';
import type { Usuario } from '@/shared/types/usuario.types';

interface LoginCredentials {
  email: string;
  contrasena: string; // Assuming 'contrasena' is the password field name
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<Usuario> => {
    const response = await apiClient.post<Usuario>('/api/auth/login', credentials);
    return response;
  },
  // Add logout or other auth-related calls if needed
};