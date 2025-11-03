import { supabase } from '@config/supabase';
import { Pedido, DetallePedido } from '@backendTypes/order.types';

export const orderRepository = {
  async createOrder(orderData: Omit<Pedido, 'idpedido' | 'fecha' | 'total'> & { total: number }): Promise<Pedido> {
    const { data, error } = await supabase
      .from('pedido')
      .insert({
        idcliente: orderData.idcliente,
        idusuario: orderData.idusuario,
        nombrecliente: orderData.nombrecliente, // Corrected to nombrecliente
        direccion: orderData.direccion,
        notas: orderData.notas,
        estado: orderData.estado,
        total: orderData.total,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating order:', error);
      throw new Error('Could not create order');
    }
    return data as Pedido;
  },

  async createOrderDetails(orderDetails: Omit<DetallePedido, 'iddetalle'>[]): Promise<DetallePedido[]> {
    const { data, error } = await supabase
      .from('detallepedido')
      .insert(orderDetails)
      .select();

    if (error) {
      console.error('Supabase error creating order details:', error);
      throw new Error('Could not create order details');
    }
    return data as DetallePedido[];
  },

  async getAllOrders(): Promise<Pedido[]> {
    const { data, error } = await supabase
      .from('pedido')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      throw new Error('Could not fetch all orders');
    }
    return data as Pedido[];
  },
};
