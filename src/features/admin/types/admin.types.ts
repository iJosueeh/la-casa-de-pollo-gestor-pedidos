export interface MostSoldProduct {
  id: string;
  name: string;
  category: string;
  salesAmount: number;
  percentage?: number;
}

export interface DailySalesData {
  day: string;
  earnings: number;
}

export interface DashboardSummary {
  salesToday: number;
  ordersToday: number;
  averageTicket: number;
  cancellationRate: number;
  salesYesterday: number;
  ordersYesterday: number;
  averageTicketYesterday: number;
}
