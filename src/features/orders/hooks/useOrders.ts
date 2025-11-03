import { useEffect, useState, useCallback } from "react";
import { getOrders, updateOrderStatus } from "@/features/orders/services/order.service";
import type { Order, OrderStatus } from "@/features/orders/types";

export const useOrders = (initialStatusFilter?: OrderStatus) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(initialStatusFilter);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrders(statusFilter);
      setOrders(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch orders.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order => (order.id === orderId ? updatedOrder : order))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update order status.";
      setError(errorMessage);
      console.error(err);

      fetchOrders();
    }
  };
  
  const filterByStatus = (status: OrderStatus | undefined) => {
    setStatusFilter(status);
  };

  return { orders, loading, error, updateStatus, filterByStatus, currentFilter: statusFilter };
};
