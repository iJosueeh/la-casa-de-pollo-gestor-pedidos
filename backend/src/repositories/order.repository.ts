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
    console.log('Order details to create:', orderDetails);
    const { data, error } = await supabase
      .from('detallepedido')
      .insert(orderDetails)
      .select();

    if (error) {
      console.error('Supabase error creating order details:', error);
      throw new Error('Could not create order details');
    }
    console.log('Supabase response for creating order details:', data);
    return data as DetallePedido[];
  },

  async getAllOrders(status?: string): Promise<Pedido[]> {
    let query = supabase.from('pedido').select('*').order('fecha', { ascending: false });

    if (status) {
      query = query.eq('estado', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching all orders:', error);
      throw new Error('Could not fetch all orders');
    }
    return data as Pedido[];
  },

  async getOrderById(orderId: number): Promise<Pedido & { products: any[] } | null> {
    console.log('Fetching order details for orderId:', orderId);
    const { data: orderData, error: orderError } = await supabase
      .from('pedido')
      .select('*')
      .eq('idpedido', orderId)
      .single();

    if (orderError) {
      console.error(`Error fetching order with id ${orderId}:`, orderError);
      return null;
    }

    const { data: detailsData, error: detailsError } = await supabase
      .from('detallepedido')
      .select(`
        cantidad,
        subtotal,
        producto (nombre, precio)
      `)
      .eq('idpedido', orderId);

    if (detailsError) {
      console.error(`Error fetching order details for order id ${orderId}:`, detailsError);
      throw new Error('Could not fetch order details');
    }

    console.log('detailsData from Supabase (with product join):', detailsData);

    const products = detailsData.map(detail => {
      const product = detail.producto as any; // Cast to any to bypass TypeScript error
      return {
        name: product.nombre,
        quantity: detail.cantidad,
        price: product.precio,
        subtotal: detail.subtotal,
      };
    });

    console.log('Mapped products:', products);

    return { ...orderData, products };
  },
};