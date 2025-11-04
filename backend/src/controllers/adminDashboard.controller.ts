import { Request, Response } from 'express';
import { adminDashboardService } from '@services/adminDashboard.service';

export const adminDashboardController = {
  async getMostSoldProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await adminDashboardService.getMostSoldProducts();
      res.json(products);
    } catch (error: unknown) {
      console.error('Error in adminDashboardController.getMostSoldProducts:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener productos más vendidos' });
    }
  },

  async getWeeklySalesSummary(req: Request, res: Response): Promise<void> {
    try {
      const summary = await adminDashboardService.getWeeklySalesSummary();
      res.json(summary);
    } catch (error: unknown) {
      console.error('Error in adminDashboardController.getWeeklySalesSummary:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener resumen semanal de ventas' });
    }
  },

  async getDashboardSummary(req: Request, res: Response): Promise<void> {
    try {
      const salesToday = await adminDashboardService.getSalesToday();
      const ordersToday = await adminDashboardService.getOrdersToday();
      const averageTicket = await adminDashboardService.getAverageTicket();
      const cancellationRate = await adminDashboardService.getCancellationRate();

      const salesYesterday = await adminDashboardService.getSalesYesterday();
      const ordersYesterday = await adminDashboardService.getOrdersYesterday();
      const averageTicketYesterday = await adminDashboardService.getAverageTicketYesterday();

      res.json({
        salesToday,
        ordersToday,
        averageTicket,
        cancellationRate,
        salesYesterday,
        ordersYesterday,
        averageTicketYesterday,
      });
    } catch (error: unknown) {
      console.error('Error in adminDashboardController.getDashboardSummary:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener el resumen del dashboard' });
    }
  },
};
