import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../shared/hooks/useNotification';
import React from 'react';
import { Input } from '@/shared/components/iu';
import { Button } from '@/shared/components/iu';
import { useAuth } from '@/shared/hooks/useAuth'; // Import useAuth

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [generalError, setGeneralError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { login } = useAuth(); // Use the new useAuth hook

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(undefined);
    setPasswordError(undefined);
    setGeneralError(undefined);

    let hasError = false;
    if (!email) {
      setEmailError('El correo electrónico es requerido.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('La contraseña es requerida.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      await login(email, password); // Use the login function from useAuth
      showNotification('¡Bienvenido!', 'success');
      navigate('/');
    } catch (error: unknown) {
      console.error('Error en la página de login:', error);
      setGeneralError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-yellow-300 via-yellow-500 to-red-400">
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-yellow-300">
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold text-yellow-600 drop-shadow-sm">
            🐔 La Casa del Pollo
          </h1>
          <p className="text-gray-600 mt-1 text-sm font-medium">
            ¡Bienvenido! Ingresa para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          <Input
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            error={emailError}
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={passwordError}
          />

          <Button
            type="submit"
            gradient={true}
            className="w-full py-2 rounded-lg font-bold shadow-md"
          >
            Ingresar
          </Button>
        </form>

        {generalError && (
          <p className="mt-4 text-red-600 font-medium bg-red-50 py-1 rounded">
            {generalError}
          </p>
        )}
      </div>
    </div>
  );
}