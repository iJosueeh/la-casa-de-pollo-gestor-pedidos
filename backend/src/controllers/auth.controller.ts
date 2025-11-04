import { Request, Response } from 'express';
import { authService } from '@services/auth.service';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, contrasena } = req.body;
      const user = await authService.verifyCredentials(email, contrasena);

      if (user) {
        // In a real application, you would generate a JWT here
        res.json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error: unknown) {
      console.error('Error in authController.login:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Internal server error during login' });
    }
  },
};