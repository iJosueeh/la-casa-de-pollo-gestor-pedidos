import type { Order, OrderStatus } from '../types';
import type { CartItem } from '@/features/cart/types';
import { apiClient } from '@/shared/utils/apiClient'; // Import apiClient

interface CreateOrderFrontendPayload {
  clientId: number;
  userId: number; // Assuming a default user for now, will need actual user management later
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
      userId: 1, // Placeholder user ID
      nombrecliente: clientInfo.nombrecliente,
      direccion: clientInfo.direccion,
      notas: clientInfo.notas,
      items: cartItems.map(item => ({
        productId: parseInt(item.id), // Convert string ID to number for backend
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

export const getOrders = async (statusFilter?: OrderStatus): Promise<Order[]> => {
  try {
    const backendOrders = await apiClient.get<BackendOrder[]>("/api/orders", {
      params: { status: statusFilter },
    });

    // Map backend Pedido type to frontend Order type
    const mappedOrders: Order[] = backendOrders.map(bOrder => ({
      id: bOrder.idpedido.toString(),
      client: bOrder.nombrecliente,
      total: bOrder.total,
      createdAt: bOrder.fecha,
      status: bOrder.estado,
      products: [], // BackendOrder does not contain product details
      paymentMethod: "Efectivo", // Placeholder as BackendOrder does not contain payment method
    }));

    return mappedOrders;
  } catch (error: unknown) {
    console.error('❌ Error al obtener pedidos del backend:', error instanceof Error ? error.message : error);
    return [];
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

// These functions will need to be migrated to backend API calls if full backend management is desired
export const actualizarPedido = async (id: string, cambios: Partial<Order>): Promise<Order | null> => {
  console.warn('actualizarPedido is not yet implemented via backend API.');
  return null;
};

export const eliminarPedido = async (id: string): Promise<boolean> => {
  console.warn('eliminarPedido is not yet implemented via backend API.');
  return false;
};