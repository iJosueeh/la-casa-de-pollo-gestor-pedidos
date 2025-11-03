import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Modal } from './Modal';
import { useOrders } from '@/features/orders/hooks/useOrders';
import type { Order, OrderStatus } from '@/features/orders/types/order.types';


type PedidosRecientesProps = {
  title?: string;
};

const statusColors = {
  Pendiente: 'bg-orange-100 text-orange-800',
  "En preparación": 'bg-yellow-100 text-yellow-800',
  "En reparto": 'bg-blue-100 text-blue-800',
  Entregado: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
};

export const PedidosRecientes: React.FC<PedidosRecientesProps> = ({
  title = 'Pedidos Recientes',
}) => {
  const { orders, loading, error } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) return <div className="bg-white rounded-lg shadow-md p-6">Cargando pedidos...</div>;
  if (error) return <div className="bg-white rounded-lg shadow-md p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID Pedido</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.id}
                </th>
                <td className="px-6 py-4">{order.client}</td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">S/ {order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedOrder && (
          <div className="p-2 text-gray-800">
            <h4 className="text-xl font-bold mb-4 text-center">Detalles del Pedido</h4>
            
            <div className="flex flex-col gap-4 mb-4">
              {/* ID */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">ID</p>
                <p className="font-bold text-black">{selectedOrder.id}</p>
              </div>

              {/* Cliente y Fecha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-bold text-black">{selectedOrder.client}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-bold text-black">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Total */}
              <div className="bg-red-100 bg-opacity-50 p-3 rounded-lg mb-4 text-center">
                <p className="text-sm text-red-800">Total</p>
                <p className="text-2xl font-bold text-red-800">S/ {selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Productos */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-500 mb-2">Productos</p>
              <ul className="list-disc list-inside">
                {selectedOrder.products.map((product, index) => (
                  <li key={index} className="text-black">
                    <span className="font-bold">{product.name}</span> (x{product.quantity})
                  </li>
                ))}
              </ul>
            </div>

            {/* Estado */}
            <div className="flex flex-col items-center mt-4">
              <p className="text-sm text-gray-500 mb-2">Cambiar Estado:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(statusColors).map((statusKey) => {
                  const status = statusKey as OrderStatus;
                  const isSelected = selectedOrder.status === status;
                  const borderColorClass =
                    status === 'Pendiente' ? 'border-orange-500' :
                    status === 'En preparación' ? 'border-yellow-500' :
                    status === 'En reparto' ? 'border-blue-500' :
                    status === 'Entregado' ? 'border-green-500' :
                    'border-red-500';

                  return (
                    <button
                      key={status}
                      onClick={() => setSelectedOrder({ ...selectedOrder, status })}
                      className={`px-3 py-1 rounded-md text-sm font-semibold 
                        ${statusColors[status]} 
                        ${isSelected ? `border-2 ${borderColorClass}` : 'border border-transparent'}
                      `}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};