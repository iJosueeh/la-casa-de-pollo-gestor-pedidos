import type { Product } from "@/features/products/types/product.types";

export interface ProductInCart extends Product {
  quantity: number;
}

export const ORDER_STATUS = {
  PENDING: "pendiente",
  PREPARING: "en preparación",
  DELIVERING: "en reparto",
  DELIVERED: "entregado",
  CANCELED: "cancelado",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface Order {
  idpedido: number; // Aligned with backend
  nombrecliente: string; // Aligned with backend
  fecha: string; // Aligned with backend
  total: number;
  status: OrderStatus;
  // Temporarily removed products and paymentMethod as they are not directly in backend Pedido
}
