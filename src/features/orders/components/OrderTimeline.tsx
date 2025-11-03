import React from 'react';
import { ORDER_STATUS } from '@/features/orders/types';
import type { OrderStatus } from '@/features/orders/types';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const STATUS_SEQUENCE: OrderStatus[] = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.DELIVERING,
  ORDER_STATUS.DELIVERED,
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const currentStatusIndex = STATUS_SEQUENCE.indexOf(currentStatus);

  if (currentStatus === ORDER_STATUS.CANCELED) {
    return (
      <div className="text-center px-4 py-2 bg-red-100 text-red-700 rounded-lg">
        Pedido Cancelado
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full text-xs text-center">
      {STATUS_SEQUENCE.map((status, index) => {
        const isCompleted = index < currentStatusIndex;
        const isCurrent = index === currentStatusIndex;

        return (
          <React.Fragment key={status}>
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors duration-300 ${
                  isCompleted || isCurrent ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <p className={`mt-1 font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {status}
              </p>
            </div>
            {index < STATUS_SEQUENCE.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
