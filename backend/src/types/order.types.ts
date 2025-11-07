

export interface OrderItemPayload {
  productId: number; 
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  clientId: number;
  userId: number;
  nombrecliente: string;
  direccion?: string;
  notas?: string;
  metodoPago: string;
  items: OrderItemPayload[];
}

export interface Pago {
  idpago: number;
  idpedido: number;
  monto: number;
  metodo: string;
  fechapago: string;
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
  pago: Pago[];
}

export interface DetallePedido {
  iddetalle: number;
  idpedido: number;
  cantidad: number;
  subtotal: number;
  idproducto: number;
}
