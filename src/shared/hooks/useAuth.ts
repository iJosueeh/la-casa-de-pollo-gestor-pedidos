import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import type { Usuario } from '@/shared/types/usuario.types';

export const useAuth = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage on initial load
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, contrasena: string) => {
    setLoading(true);
    try {
      const loggedInUser = await authService.login({ email, contrasena });
      setUsuario(loggedInUser);
      localStorage.setItem('usuario', JSON.stringify(loggedInUser));
      return loggedInUser;
    } catch (error) {
      console.error('Login failed:', error);
      setUsuario(null);
      localStorage.removeItem('usuario');
      throw error; // Re-throw to be handled by UI
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    // Optionally, call a logout API endpoint here if needed
  }, []);

  return { usuario, loading, login, logout };
};