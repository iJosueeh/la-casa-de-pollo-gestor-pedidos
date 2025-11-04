import { useEffect, useState, useCallback } from "react";
import { getOrders, updateOrderStatus } from "@/features/orders/services/order.service";
import type { Order, OrderStatus } from "@/features/orders/types";

const ITEMS_PER_PAGE = 6; // Define items per page

export const useOrders = (initialStatusFilter?: OrderStatus) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(initialStatusFilter);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [totalPages, setTotalPages] = useState(1); // New state for total pages

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { orders: fetchedOrders, totalCount } = await getOrders(statusFilter, currentPage, ITEMS_PER_PAGE);
      setOrders(fetchedOrders);
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE)); // Calculate total pages
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch orders.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, currentPage]); // Add currentPage to dependencies

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, newStatus);
      // After successful update, re-fetch current page orders to reflect the change
      await fetchOrders();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update order status.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = (status: OrderStatus | undefined) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { orders, loading, error, updateStatus, filterByStatus, currentFilter: statusFilter, currentPage, totalPages, goToPage };
};
