import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../features/auth/services/superbaseClient';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("email", email)
      .eq("contrasena", password)
      .single();

    if (error || !data) {
      setError("Correo o contraseña incorrectos.");
    } else {
      localStorage.setItem("usuario", JSON.stringify(data));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-yellow-500 to-red-400">
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
          <div className="text-left">
            <label className="block text-gray-700 font-semibold mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full border border-yellow-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-700 font-semibold mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-yellow-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 rounded-lg font-bold hover:bg-yellow-600 transition duration-300 shadow-md"
          >
            Ingresar
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 font-medium bg-red-50 py-1 rounded">
            {error}
          </p>
        )}

        
      </div>
    </div>
  );
}