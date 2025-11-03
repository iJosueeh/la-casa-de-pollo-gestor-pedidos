
import { supabase } from '@/lib/supabase';
import type { Order } from '../types';

const TABLA_PEDIDOS = 'orders';


export const crearPedido = async (pedido: Omit<Order, 'id'>): Promise<Order | null> => {
  const { data, error } = await supabase
    .from(TABLA_PEDIDOS)
    .insert(pedido)
    .select()
    .single();

  if (error) {
    console.error('❌ Error al crear pedido:', error.message);
    return null;
  }
  return data as Order;
};


export const obtenerPedidos = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from(TABLA_PEDIDOS)
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error('❌ Error al obtener pedidos:', error.message);
    return [];
  }
  return data as Order[];
};


export const actualizarPedido = async (id: string, cambios: Partial<Order>): Promise<Order | null> => {
  const { data, error } = await supabase
    .from(TABLA_PEDIDOS)
    .update(cambios)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('❌ Error al actualizar pedido:', error.message);
    return null;
  }
  return data as Order;
};


export const eliminarPedido = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from(TABLA_PEDIDOS).delete().eq('id', id);
  if (error) {
    console.error('❌ Error al eliminar pedido:', error.message);
    return false;
  }
  return true;
};
