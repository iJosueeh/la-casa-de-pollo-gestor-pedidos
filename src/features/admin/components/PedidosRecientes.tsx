import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "./Modal";
import { useOrders } from "@/features/orders/hooks/useOrders";
import {
  ORDER_STATUS,
  type Order,
  type OrderStatus,
} from "@/features/orders/types/order.types";
import { getOrderDetails } from "@/features/orders/services/order.service";
import { Button } from "@/shared/components/iu";
import { formatDateLocal, formatDateTimeLocal } from "@/shared/utils/dateUtils";

type PedidosRecientesProps = {
  title?: string;
};

const statusColors: Record<OrderStatus, string> = {
  [ORDER_STATUS.PENDING]: "bg-orange-100 text-orange-800",
  [ORDER_STATUS.PREPARING]: "bg-yellow-100 text-yellow-800",
  [ORDER_STATUS.DELIVERING]: "bg-blue-100 text-blue-800",
  [ORDER_STATUS.DELIVERED]: "bg-green-100 text-green-800",
  [ORDER_STATUS.CANCELED]: "bg-red-100 text-red-800",
};

export const PedidosRecientes: React.FC<PedidosRecientesProps> = ({
  title = "Pedidos Recientes",
}) => {
  const {
    orders,
    loading,
    error,
    updateStatus,
    currentPage,
    totalPages,
    goToPage,
  } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleOpenModal = async (order: Order) => {
    setModalLoading(true);
    setIsModalOpen(true);
    try {
      const details = await getOrderDetails(order.id);
      setSelectedOrder(details);
    } catch (err) {
      console.error("Error fetching order details for modal:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (selectedOrder) {
      await updateStatus(selectedOrder.id, newStatus);
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        Cargando pedidos...
      </div>
    );
  if (error)
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-w-0">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID Pedido
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.id}
                </th>
                <td className="px-6 py-4">{order.client}</td>
                <td className="px-6 py-4">
                  {formatDateLocal(order.createdAt)}
                </td>
                <td className="px-6 py-4">S/ {order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleOpenModal(order)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-4">
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
              key={`${currentPage}-${page}`}
              onClick={() => goToPage(page)}
              variant={currentPage === page ? "info" : "secondary"}
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="ml-3 text-gray-600">
              Cargando detalles del pedido...
            </p>
          </div>
        ) : (
          selectedOrder && (
            <div className="p-2 text-gray-800">
              <h4 className="text-xl font-bold mb-4 text-center">
                Detalles del Pedido
              </h4>

              <div className="flex flex-col gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-bold text-black">{selectedOrder.id}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-bold text-black">
                      {selectedOrder.client}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-bold text-black">
                      {formatDateTimeLocal(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Método de Pago</p>
                  <p className="font-bold text-black">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-500 mb-2">Productos</p>
                <ul className="list-disc list-inside">
                  {selectedOrder.products.map((product) => (
                    <li key={product.id} className="text-black">
                      <span className="font-bold">{product.name}</span> (x
                      {product.quantity})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center mt-4">
                <p className="text-sm text-gray-500 mb-2">Cambiar Estado:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.values(ORDER_STATUS).map((status) => {
                    const isSelected = selectedOrder.status === status;
                    const borderColorClass =
                      status === ORDER_STATUS.PENDING
                        ? "border-orange-500"
                        : status === ORDER_STATUS.PREPARING
                        ? "border-yellow-500"
                        : status === ORDER_STATUS.DELIVERING
                        ? "border-blue-500"
                        : status === ORDER_STATUS.DELIVERED
                        ? "border-green-500"
                        : "border-red-500";
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-1 rounded-md text-sm font-semibold
                          ${statusColors[status]}
                          ${
                            isSelected
                              ? `border-2 ${borderColorClass}`
                              : "border border-transparent"
                          }
                        `}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
};
