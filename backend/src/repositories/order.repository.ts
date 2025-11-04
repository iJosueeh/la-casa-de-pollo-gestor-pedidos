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
        nombrecliente: orderData.nombrecliente, // Corrected to nombrecliente
        direccion: orderData.direccion,
        notas: orderData.notas,
        estado: 'pendiente', // Default status
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

  async getOrderById(orderId: number): Promise<Pedido & { products: { idproducto: number; name: string; quantity: number; price: number; subtotal: number }[] } | null> {
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
        iddetalle,
        idpedido,
        idproducto,
        cantidad,
        subtotal
      `)
      .eq('idpedido', orderId);

    console.log('Raw detailsData from Supabase:', detailsData);
    console.log('Raw detailsError from Supabase:', detailsError);

    if (detailsError) {
      console.error(`Error fetching order details for order id ${orderId}:`, detailsError);
      return null;
    }

    // Extract unique product IDs
    const productIds = [...new Set(detailsData.map(detail => detail.idproducto))];

    // Fetch product names and prices separately
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

    console.log('Mapped products:', products);

    return { ...orderData, products };
  },
};