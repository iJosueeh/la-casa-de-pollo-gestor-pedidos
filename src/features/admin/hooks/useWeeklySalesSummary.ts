import { useEffect, useState } from "react";
import { adminDashboardService } from "../services/adminDashboard.service";
import type { DailySalesData } from "../types/admin.types";

export const useWeeklySalesSummary = () => {
  const [summary, setSummary] = useState<DailySalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklySalesSummary = async () => {
      try {
        setLoading(true);
        const data = await adminDashboardService.getWeeklySalesSummary();
        setSummary(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch weekly sales summary.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklySalesSummary();
  }, []);

  return { summary, loading, error };
};
