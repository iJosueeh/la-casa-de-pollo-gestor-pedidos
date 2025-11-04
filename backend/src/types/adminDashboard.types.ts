export interface MostSoldProduct {
  id: string;
  name: string;
  category: string;
  salesAmount: number;
  percentage?: number; // Optional, can be calculated on frontend
}

export interface DailySalesData {
  day: string;
  earnings: number;
}
