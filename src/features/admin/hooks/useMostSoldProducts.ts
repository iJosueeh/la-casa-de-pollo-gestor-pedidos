import { useEffect, useState } from "react";
import { adminDashboardService } from "../services/adminDashboard.service";
import type { MostSoldProduct } from "../types/admin.types";

export const useMostSoldProducts = () => {
  const [products, setProducts] = useState<MostSoldProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostSoldProducts = async () => {
      try {
        setLoading(true);
        const data = await adminDashboardService.getMostSoldProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch most sold products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMostSoldProducts();
  }, []);

  return { products, loading, error };
};
