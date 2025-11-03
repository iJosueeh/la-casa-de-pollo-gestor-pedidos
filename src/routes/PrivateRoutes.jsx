import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const user = JSON.parse(localStorage.getItem("usuario"));
  return user ? children : <Navigate to="/login" />;
}