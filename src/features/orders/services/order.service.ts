import type { Order } from '../types';
import type { CartItem } from '@/features/cart/types';
import { supabase } from '@/config/supabase'; // Import supabase for existing functions

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000";
const TABLA_PEDIDOS = 'pedido'; // Define table name here

interface CreateOrderFrontendPayload {
  clientId: number;
  userId: number; // Assuming a default user for now, will need actual user management later
  nombrecliente: string;
  direccion?: string;
  notas?: string;
  items: Array<{ productId: number; quantity: number; price: number }>;
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

    const response = await fetch(`${BACKEND_API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error al crear pedido en el backend:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Order = await response.json();
    return data;
  } catch (error: unknown) {
    console.error('❌ Error al crear pedido:', error instanceof Error ? error.message : error);
    return null;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/orders`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const backendOrders: any[] = await response.json(); // Use 'any' for raw backend response

    // Map backend Pedido type to frontend Order type
    const mappedOrders: Order[] = backendOrders.map(bOrder => ({
      id: bOrder.idpedido.toString(), // Convert number to string
      client: bOrder.nombrecliente, // Map nombrecliente to client
      total: bOrder.total,
      createdAt: bOrder.fecha, // Map fecha to createdAt
      status: bOrder.estado, // Map estado to status
      products: [], // Placeholder: Backend currently doesn't return products directly with Pedido
      paymentMethod: "Efectivo", // Placeholder: Backend currently doesn't return paymentMethod directly with Pedido
    }));

    return mappedOrders;
  } catch (error: unknown) {
    console.error('❌ Error al obtener pedidos del backend:', error instanceof Error ? error.message : error);
    return [];
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