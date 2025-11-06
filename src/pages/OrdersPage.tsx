import { useOrders } from '@/features/orders/hooks/useOrders';
import { OrderList } from '@/shared/components/OrderList';
import React from 'react';
import { ORDER_STATUS } from '@/features/orders/types';
import type { OrderStatus } from '@/features/orders/types';
import { Button } from '@/shared/components/iu';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const statusFilters: (OrderStatus | undefined)[] = [
  undefined, 
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
  const { orders, loading, error, filterByStatus, currentFilter, currentPage, totalPages, goToPage } = useOrders();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Gestión de Pedidos</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statusFilters.map(status => (
          <Button
            key={status || 'all'}
            onClick={() => filterByStatus(status)}
            variant={currentFilter === status ? 'info' : 'secondary'}
            className="transition-colors duration-200"
          >
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
      {!loading && !error && (
        <>
          <OrderList orders={orders} />
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="secondary"
                className="p-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  onClick={() => goToPage(page)}
                  variant={currentPage === page ? 'info' : 'secondary'}
                  className="px-4 py-2"
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="secondary"
                className="p-2"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;