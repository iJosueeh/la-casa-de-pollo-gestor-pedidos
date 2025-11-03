import { supabase } from "@/lib/supabase";
import type { Order, OrderStatus } from "@/features/orders/types";

const TABLE_NAME = "orders";

// 1. Create (Crear un nuevo pedido)
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error(error.message);
  }
  return data as Order;
};

// 2. Read (Leer todos los pedidos o filtrar por estado)
export const getOrders = async (status?: OrderStatus): Promise<Order[]> => {
  let query = supabase.from(TABLE_NAME).select("*");

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query.order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error(error.message);
  }
  return (data as Order[]) || [];
};

// 3. Update (Actualizar el estado de un pedido)
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw new Error(error.message);
  }
  return data as Order;
};

// 4. Delete (Eliminar un pedido)
export const deleteOrder = async (orderId: string): Promise<void> => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", orderId);

  if (error) {
    console.error(`Error deleting order ${orderId}:`, error);
    throw new Error(error.message);
  }
};
