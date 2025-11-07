import { orderRepository } from '@repositories/order.repository';
import { CreateOrderPayload, Pedido, DetallePedido } from '@backendTypes/order.types';

interface OrderProduct {
  idproducto: number;
  name: string;
  quantity: number;
  price: number;
}

export const orderService = {
  async processNewOrder(payload: CreateOrderPayload): Promise<Pedido> {
    const { clientId, userId, nombrecliente, direccion, notas, items, metodoPago } = payload;

    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    
    const newOrder = await orderRepository.createOrder({
      idcliente: clientId,
      idusuario: userId,
      nombrecliente,
      direccion,
      notas,
      estado: 'pendiente', 
      total,
    });

    
    const orderDetailsToCreate: Omit<DetallePedido, 'iddetalle'>[] = items.map(item => ({
      idpedido: newOrder.idpedido,
      idproducto: item.productId,
      cantidad: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    
    await orderRepository.createOrderDetails(orderDetailsToCreate);

    await orderRepository.createPayment({
      idpedido: newOrder.idpedido,
      monto: total,
      metodo: metodoPago,
      fechapago: new Date(),
    });

    return newOrder;
  },

  async listAllOrders(status?: string, page?: number, limit?: number): Promise<{ orders: Pedido[], totalCount: number }> {
    const { orders, totalCount } = await orderRepository.getAllOrders(status, page, limit);
    return { orders, totalCount };
  },

  async getOrderDetails(orderId: number): Promise<Pedido & { products: OrderProduct[] } | null> {
    return orderRepository.getOrderById(orderId);
  },

  async updateOrderStatus(orderId: number, newStatus: string): Promise<Pedido | null> {
    return orderRepository.updateOrderStatus(orderId, newStatus);
  },
};