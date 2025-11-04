import { apiClient } from '@/shared/utils/apiClient';
import type { Usuario } from '@/shared/types/usuario.types';

interface LoginCredentials {
  email: string;
  contrasena: string; 
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<Usuario> => {
    const response = await apiClient.post<Usuario>('/api/auth/login', credentials);
    return response;
  },
  
};