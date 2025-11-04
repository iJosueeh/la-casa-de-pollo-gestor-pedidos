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
    const { clientId, userId, nombrecliente, direccion, notas, items } = payload;

    // Calculate total from items
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create the main order (pedido)
    const newOrder = await orderRepository.createOrder({
      idcliente: clientId,
      idusuario: userId,
      nombrecliente,
      direccion,
      notas,
      estado: 'pendiente', // Default status
      total,
    });

    // Prepare order details (detallepedido)
    const orderDetailsToCreate: Omit<DetallePedido, 'iddetalle'>[] = items.map(item => ({
      idpedido: newOrder.idpedido,
      idproducto: item.productId,
      cantidad: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    // Create order details
    await orderRepository.createOrderDetails(orderDetailsToCreate);

    return newOrder;
  },

  async listAllOrders(status?: string): Promise<Pedido[]> {
    const orders = await orderRepository.getAllOrders(status);
    return orders;
  },

  async getOrderDetails(orderId: number): Promise<Pedido & { products: OrderProduct[] } | null> {
    return orderRepository.getOrderById(orderId);
  },
};