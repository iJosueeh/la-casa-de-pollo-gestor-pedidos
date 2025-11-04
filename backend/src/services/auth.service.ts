import { authRepository } from '@repositories/auth.repository';
import { Usuario } from '@backendTypes/usuario.types';

export const authService = {
  async verifyCredentials(email: string, contrasena: string): Promise<Usuario | null> {
    const user = await authRepository.findByEmail(email);

    if (user && user.contrasena === contrasena) { // In a real app, hash and compare passwords securely
      // Exclude sensitive information like password before returning
      const { contrasena: _, ...userWithoutPassword } = user;
      return userWithoutPassword as Usuario;
    }
    return null;
  },
};