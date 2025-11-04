import { useEffect, useState } from "react";
import { adminDashboardService } from "../services/adminDashboard.service";
import type { DashboardSummary } from "../types/admin.types";

export const useDashboardSummary = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        setLoading(true);
        const data = await adminDashboardService.getDashboardSummary();
        setSummary(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch dashboard summary.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  return { summary, loading, error };
};
