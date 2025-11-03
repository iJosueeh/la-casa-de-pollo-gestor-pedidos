import { Product } from './product.types';

export interface OrderItemPayload {
  productId: number; // Corrected to number to match idproducto in DB
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  clientId: number;
  userId: number;
  nombrecliente: string;
  direccion?: string;
  notas?: string;
  items: OrderItemPayload[];
}

export interface Pedido {
  idpedido: number;
  fecha: string;
  estado: string;
  nombrecliente: string;
  direccion?: string;
  notas?: string;
  total: number;
  idcliente: number;
  idusuario: number;
}

export interface DetallePedido {
  iddetalle: number;
  idpedido: number;
  cantidad: number;
  subtotal: number;
  idproducto: number;
}
