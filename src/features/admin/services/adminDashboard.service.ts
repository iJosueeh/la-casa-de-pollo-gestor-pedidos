import { apiClient } from '@/shared/utils/apiClient';
import { type MostSoldProduct, type DailySalesData, type DashboardSummary } from '@/features/admin/types/admin.types';

export const adminDashboardService = {
  async getMostSoldProducts(): Promise<MostSoldProduct[]> {
    try {
      const data = await apiClient.get<MostSoldProduct[]>("/api/admin/most-sold");
      return data;
    } catch (error: unknown) {
      console.error("Error al obtener productos más vendidos del backend:", error instanceof Error ? error.message : error);
      return [];
    }
  },

  async getWeeklySalesSummary(): Promise<DailySalesData[]> {
    try {
      const data = await apiClient.get<DailySalesData[]>("/api/admin/weekly-summary");
      return data;
    } catch (error: unknown) {
      console.error("Error al obtener resumen semanal de ventas del backend:", error instanceof Error ? error.message : error);
      return [];
    }
  },

  async getDashboardSummary(): Promise<DashboardSummary | null> {
    try {
      const data = await apiClient.get<DashboardSummary>("/api/admin/summary");
      return data;
    } catch (error: unknown) {
      console.error("Error al obtener resumen del dashboard del backend:", error instanceof Error ? error.message : error);
      return null;
    }
  },
};
