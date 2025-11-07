import { Request, Response } from 'express';
import { orderService } from '@services/order.service';
import { CreateOrderPayload } from '@backendTypes/order.types';

export const orderController = {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderPayload: CreateOrderPayload = req.body;

      
      if (!orderPayload.clientId || !orderPayload.userId || !orderPayload.nombrecliente || !orderPayload.items || orderPayload.items.length === 0 || !orderPayload.metodoPago) {
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
      const { status, page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      const { orders, totalCount } = await orderService.listAllOrders(status as string | undefined, pageNumber, limitNumber);
      console.log('Backend response for getOrders - orders:', orders);
      res.json({ orders, totalCount });
    }
    catch (error: unknown) {
      console.error('Error in orderController.getOrders:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener pedidos' });
    }
  },

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderDetails(parseInt(id, 10));
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error: unknown) {
      console.error('Error in orderController.getOrderById:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener el pedido' });
    }
  },

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        res.status(400).json({ error: 'Status is required' });
        return;
      }

      const updatedOrder = await orderService.updateOrderStatus(parseInt(id, 10), status);
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error: unknown) {
      console.error('Error in orderController.updateOrderStatus:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al actualizar el estado del pedido' });
    }
  },
};