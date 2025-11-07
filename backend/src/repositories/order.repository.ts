import { supabase } from '@config/supabase';
import { Pedido, DetallePedido } from '@backendTypes/order.types';

interface CreatePedidoPayload {
  idcliente: number;
  idusuario: number;
  nombrecliente: string;
  direccion?: string;
  notas?: string;
  estado: string;
  total: number;
}

interface CreatePaymentPayload {
  idpedido: number;
  monto: number;
  metodo: string;
  fechapago: Date;
}

interface ProductDetailFromJoin {
  nombre: string;
  precio: number;
}

export const orderRepository = {
  async createOrder(orderData: CreatePedidoPayload): Promise<Pedido> {
    const { data, error } = await supabase
      .from('pedido')
      .insert({
        idcliente: orderData.idcliente,
        idusuario: orderData.idusuario,
        nombrecliente: orderData.nombrecliente, 
        direccion: orderData.direccion,
        notas: orderData.notas,
        estado: 'pendiente', 
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

  async createPayment(paymentData: CreatePaymentPayload): Promise<void> {

    const { data, error } = await supabase
      .from('pago')
      .insert({
        idpedido: paymentData.idpedido,
        monto: paymentData.monto,
        metodo: paymentData.metodo,
        fechapago: paymentData.fechapago.toISOString(),
      });

    if (error) {
      console.error('Supabase error creating payment:', error);
      throw new Error('Could not create payment');
    }
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

  async getAllOrders(status?: string, page: number = 1, limit: number = 6): Promise<{ orders: Pedido[], totalCount: number }> {
    const offset = (page - 1) * limit;

    let query = supabase.from('pedido').select('*, pago_idpedido_fkey(*)', { count: 'exact' }).order('fecha', { ascending: false }).order('idpedido', { ascending: false });

    if (status) {
      query = query.eq('estado', status);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching all orders with pagination from Supabase:', error);
      throw new Error('Could not fetch all orders with pagination');
    }

    return { orders: data as Pedido[], totalCount: count || 0 };
  },

  async getOrderById(orderId: number): Promise<Pedido & { products: { idproducto: number; name: string; quantity: number; price: number; subtotal: number }[] } | null> {

    const { data: orderData, error: orderError } = await supabase
      .from('pedido')
      .select('*, pago_idpedido_fkey(*)')
      .eq('idpedido', orderId)
      .single();

    if (orderError) {
      console.error(`Error fetching order with id ${orderId}:`, orderError);
      return null;
    }

    const { data: detailsData, error: detailsError } = await supabase
      .from('detallepedido')
      .select(`
        iddetalle,
        idpedido,
        idproducto,
        cantidad,
        subtotal
      `)
      .eq('idpedido', orderId);




    if (detailsError) {
      console.error(`Error fetching order details for order id ${orderId}:`, detailsError);
      return null;
    }

    
    const productIds = [...new Set(detailsData.map(detail => detail.idproducto))];

    
    const { data: productsData, error: productsError } = await supabase
      .from('producto')
      .select('idproducto, nombre, precio')
      .in('idproducto', productIds);

    if (productsError) {
      console.error(`Error fetching product details for order id ${orderId}:`, productsError);
      return null;
    }

    const productMap = new Map<number, ProductDetailFromJoin>();
    productsData.forEach(p => {
      productMap.set(p.idproducto, { nombre: p.nombre, precio: p.precio });
    });

    const products = detailsData.map((detail: DetallePedido) => {
      const productInfo = productMap.get(detail.idproducto) || { nombre: 'Unknown', precio: 0 };
      return {
        idproducto: detail.idproducto,
        name: productInfo.nombre,
        quantity: detail.cantidad,
        price: productInfo.precio,
        subtotal: detail.subtotal,
      };
    });



    return { ...orderData, products };
  },

  async updateOrderStatus(orderId: number, newStatus: string): Promise<Pedido | null> {

    const { data, error } = await supabase
      .from('pedido')
      .update({ estado: newStatus })
      .eq('idpedido', orderId)
      .select(); 

    if (error) {
      console.error(`Supabase error updating status for order ${orderId}:`, error);
      throw new Error('Could not update order status');
    }

    
    if (!data || data.length === 0) {
      return null;
    }

    return data[0] as Pedido;
  },
};