import React from 'react';
import type { Order } from '@/features/orders/types';
import { Card } from '@/shared/components/iu';
import { OrderTimeline } from './OrderTimeline';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-PE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Card className="mb-4 transition-all duration-300">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg">Pedido #{order.id.substring(0, 8)}</h3>
            <p className="text-sm text-gray-500">Cliente: {order.client}</p>
            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
          <div className="md:col-span-2">
            <OrderTimeline currentStatus={order.status} />
          </div>
          <div className="md:col-span-1 text-right">
            <p className="font-bold text-xl text-red-600">S/. {order.total.toFixed(2)}</p>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center ml-auto">
              {isExpanded ? 'Ver menos' : 'Ver detalles'}
              {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in-down">
            <h4 className="font-semibold mb-2">Detalles del Pedido:</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p><strong>Método de Pago:</strong> {order.paymentMethod}</p>
                    <p><strong>Estado:</strong> <span className="font-medium p-1 rounded-md bg-blue-100 text-blue-800">{order.status}</span></p>
                </div>
                <div>
                    <h5 className="font-semibold mb-1">Productos:</h5>
                    <ul className="list-disc pl-5 text-sm">
                    {order.products.map(p => (
                        <li key={p.id}>{p.name} (x{p.quantity})</li>
                    ))}
                    </ul>
                </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
