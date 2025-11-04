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
  id: string;
  client: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
  products: ProductInCart[];
  paymentMethod: string;
}
