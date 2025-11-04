import { adminDashboardRepository } from '@repositories/adminDashboard.repository';
import { MostSoldProduct, DailySalesData } from '@backendTypes/adminDashboard.types';

export const adminDashboardService = {
  async getMostSoldProducts(): Promise<MostSoldProduct[]> {
    return adminDashboardRepository.getMostSoldProducts();
  },

  async getWeeklySalesSummary(): Promise<DailySalesData[]> {
    return adminDashboardRepository.getWeeklySalesSummary();
  },

  async getSalesToday(): Promise<number> {
    return adminDashboardRepository.getSalesToday();
  },

  async getOrdersToday(): Promise<number> {
    return adminDashboardRepository.getOrdersToday();
  },

  async getAverageTicket(): Promise<number> {
    return adminDashboardRepository.getAverageTicket();
  },

  async getCancellationRate(): Promise<number> {
    return adminDashboardRepository.getCancellationRate();
  },

  async getSalesYesterday(): Promise<number> {
    return adminDashboardRepository.getSalesYesterday();
  },

  async getOrdersYesterday(): Promise<number> {
    return adminDashboardRepository.getOrdersYesterday();
  },

  async getAverageTicketYesterday(): Promise<number> {
    return adminDashboardRepository.getAverageTicketYesterday();
  },
};
