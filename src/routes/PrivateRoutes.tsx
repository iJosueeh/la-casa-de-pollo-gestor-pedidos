import { Navigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";
import React from "react";

export default function PrivateRoutes({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth();

  if (loading) {
    
    return <div>Cargando...</div>;
  }

  return usuario ? children : <Navigate to="/login" />;
}