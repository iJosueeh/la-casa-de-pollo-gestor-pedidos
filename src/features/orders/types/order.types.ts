import type { Product } from "@/features/products/types/product.types";

export interface ProductInCart extends Product {
  quantity: number;
}

export const ORDER_STATUS = {
  PENDING: "Pendiente",
  PREPARING: "En preparación",
  DELIVERING: "En reparto",
  DELIVERED: "Entregado",
  CANCELED: "Cancelado",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface Order {
  id: string;
  client: string;
  products: ProductInCart[];
  paymentMethod: "Efectivo" | "Tarjeta";
  total: number;
  createdAt: string;
  status: OrderStatus;
}
