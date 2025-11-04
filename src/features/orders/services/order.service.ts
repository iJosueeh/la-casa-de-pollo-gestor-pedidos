import type { Order, OrderStatus } from '../types';
import type { CartItem } from '@/features/cart/types';
import { apiClient } from '@/shared/utils/apiClient'; 

interface CreateOrderFrontendPayload {
  clientId: number;
  userId: number; 
  nombrecliente: string;
  direccion?: string;
  notas?: string;
  items: Array<{ productId: number; quantity: number; price: number }>;
}

interface BackendProduct {
  idproducto: number;
  name: string;
  quantity: number;
  price: number;
}

interface BackendOrder {
  idpedido: number;
  nombrecliente: string;
  total: number;
  fecha: string;
  estado: OrderStatus;
}

interface BackendOrderDetails extends BackendOrder {
  products: BackendProduct[];
}

export const createOrder = async (cartItems: CartItem[], clientInfo: { clientId: number; nombrecliente: string; direccion?: string; notas?: string }): Promise<Order | null> => {
  try {
    const payload: CreateOrderFrontendPayload = {
      clientId: clientInfo.clientId,
      userId: 1, 
      nombrecliente: clientInfo.nombrecliente,
      direccion: clientInfo.direccion,
      notas: clientInfo.notas,
      items: cartItems.map(item => ({
        productId: parseInt(item.id), 
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const data = await apiClient.post<Order>("/api/orders", payload);
    return data;
  } catch (error: unknown) {
    console.error('❌ Error al crear pedido:', error instanceof Error ? error.message : error);
    return null;
  }
};

export const getOrders = async (statusFilter?: OrderStatus, page?: number, limit?: number): Promise<{ orders: Order[], totalCount: number }> => {
  try {
    const response = await apiClient.get<{ orders: BackendOrder[], totalCount: number }>("/api/orders", {
      params: { status: statusFilter, page, limit },
    });

    
    const mappedOrders: Order[] = response.orders.map(bOrder => ({
      id: bOrder.idpedido.toString(),
      client: bOrder.nombrecliente,
      total: bOrder.total,
      createdAt: bOrder.fecha,
      status: bOrder.estado,
      products: [], 
      paymentMethod: "Efectivo",
    }));

    return { orders: mappedOrders, totalCount: response.totalCount };
  } catch (error: unknown) {
    console.error('❌ Error al obtener pedidos del backend:', error instanceof Error ? error.message : error);
    return { orders: [], totalCount: 0 };
  }
};

export const getOrderDetails = async (orderId: string): Promise<Order | null> => {
  try {
    const orderDetails = await apiClient.get<BackendOrderDetails>(`/api/orders/${orderId}`);
    console.log('Raw orderDetails from API client:', orderDetails);

    const mappedOrder: Order = {
      id: orderDetails.idpedido.toString(),
      client: orderDetails.nombrecliente,
      total: orderDetails.total,
      createdAt: orderDetails.fecha,
      status: orderDetails.estado,
      products: orderDetails.products.map((p: BackendProduct) => ({ id: p.idproducto.toString(), name: p.name, quantity: p.quantity, price: p.price })),
      paymentMethod: "Efectivo",
    };

    return mappedOrder;
  } catch (error: unknown) {
    console.error(`❌ Error al obtener los detalles del pedido ${orderId}:`, error instanceof Error ? error.message : error);
    return null;
  }
};

export const updateOrderStatus = async (orderId: string, newStatus: OrderStatus): Promise<Order | null> => {
  try {
    const updatedOrder = await apiClient.patch<Order>(`/api/orders/${orderId}/status`, { status: newStatus });
    return updatedOrder;
  } catch (error: unknown) {
    console.error(`❌ Error al actualizar el estado del pedido ${orderId}:`, error instanceof Error ? error.message : error);
    return null;
  }
};

