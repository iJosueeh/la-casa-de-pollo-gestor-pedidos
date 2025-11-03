import { useOrders } from '@/features/orders/hooks/useOrders';
import { OrderList } from '@/shared/components/OrderList';
import React from 'react';
import { ORDER_STATUS } from '@/features/orders/types';
import type { OrderStatus } from '@/features/orders/types';
import { Button } from '@/shared/components/iu';

const statusFilters: (OrderStatus | undefined)[] = [
  undefined, // All
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.DELIVERING,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELED,
];

const statusLabels: Record<string, string> = {
    [ORDER_STATUS.PENDING]: 'Pendientes',
    [ORDER_STATUS.PREPARING]: 'En Preparación',
    [ORDER_STATUS.DELIVERING]: 'En Reparto',
    [ORDER_STATUS.DELIVERED]: 'Entregados',
    [ORDER_STATUS.CANCELED]: 'Cancelados',
    all: 'Todos'
}

const OrdersPage = () => {
  const { orders, loading, error, filterByStatus, currentFilter } = useOrders();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Pedidos</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statusFilters.map(status => (
          <Button
            key={status || 'all'}
            onClick={() => filterByStatus(status)}
            className={`transition-colors duration-200 ${
              currentFilter === status
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>
            {statusLabels[status || 'all']}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-10">
          <p>Cargando pedidos...</p> 
        </div>
      )}
      {error && (
        <div className="text-center py-10 bg-red-100 text-red-700 rounded-lg">
          <p>Error al cargar los pedidos: {error}</p>
        </div>
      )}
      {!loading && !error && <OrderList orders={orders} />}
    </div>
  );
};

export default OrdersPage;
