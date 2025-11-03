import React from 'react';
import type { Order } from '@/features/orders/types';
import { OrderCard } from '@/features/orders/components/OrderCard';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No se encontraron pedidos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
