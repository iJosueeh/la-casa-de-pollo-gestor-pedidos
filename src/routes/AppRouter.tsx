
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import { AdminPage } from '../pages/AdminPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import PrivateRoutes from "../routes/PrivateRoutes";
import Login from '@/pages/Login';
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/*  Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/*  Rutas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <App />
            </PrivateRoutes>
          }
        >
          {/* Página principal = productos */}
          <Route index element={<ProductPage />} />
          <Route path="producto" element={<ProductPage />} />
          <Route path="carrito" element={<CartPage />} />
          <Route path="pedidos" element={<OrdersPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};