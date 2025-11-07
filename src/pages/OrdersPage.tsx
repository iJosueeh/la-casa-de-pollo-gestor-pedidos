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

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to max, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end of the middle range
      let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2) + 1);
      let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2) - 1);

      // Adjust start/end if they go out of bounds
      if (endPage - startPage + 1 < maxPagesToShow - 2) { // -2 for first and last page
        if (currentPage < totalPages / 2) {
          endPage = startPage + maxPagesToShow - 3; // -3 for first, last, and one ellipsis
        } else {
          startPage = endPage - (maxPagesToShow - 3);
        }
      }

      // Ensure startPage is not less than 2
      startPage = Math.max(2, startPage);
      // Ensure endPage is not greater than totalPages - 1
      endPage = Math.min(totalPages - 1, endPage);

      // Add first page
      pages.push(1);

      // Add ellipsis if needed after first page
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed before last page
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Add last page
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationRange = getPaginationRange(currentPage, totalPages);

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
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-8">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="secondary"
                className="p-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {paginationRange.map((page, index) => {
                if (page === '...') {
                  return <span key={`${page}-${index}`} className="px-2 py-1 sm:px-4 sm:py-2">...</span>;
                }
                return (
                  <Button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    variant={currentPage === page ? 'info' : 'secondary'}
                    className="px-2 py-1 sm:px-4 sm:py-2"
                  >
                    {page}
                  </Button>
                );
              })}
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