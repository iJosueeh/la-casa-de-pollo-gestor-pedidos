import { Request, Response } from 'express';
import { orderService } from '@services/order.service';
import { CreateOrderPayload } from '@backendTypes/order.types';

export const orderController = {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderPayload: CreateOrderPayload = req.body;

      // Basic validation (can be expanded with a validation library)
      if (!orderPayload.clientId || !orderPayload.userId || !orderPayload.nombrecliente || !orderPayload.items || orderPayload.items.length === 0) {
        res.status(400).json({ error: 'Missing required order fields' });
        return;
      }

      const newOrder = await orderService.processNewOrder(orderPayload);
      res.status(201).json(newOrder);
    } catch (error: unknown) {
      console.error('Error in orderController.createOrder:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al crear el pedido' });
    }
  },

  async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.listAllOrders();
      res.json(orders);
    }
    catch (error: unknown) {
      console.error('Error in orderController.getOrders:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener pedidos' });
    }
  },
};
