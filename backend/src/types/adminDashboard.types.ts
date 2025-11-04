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
