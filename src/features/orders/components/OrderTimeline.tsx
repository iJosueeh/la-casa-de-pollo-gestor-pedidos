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

const statusBackgroundColors = {
  [ORDER_STATUS.PENDING]: 'bg-orange-500',
  [ORDER_STATUS.PREPARING]: 'bg-yellow-500',
  [ORDER_STATUS.DELIVERING]: 'bg-blue-500',
  [ORDER_STATUS.DELIVERED]: 'bg-green-500',
  [ORDER_STATUS.CANCELED]: 'bg-red-500', 
};

const statusTextColors = {
  [ORDER_STATUS.PENDING]: 'text-orange-600',
  [ORDER_STATUS.PREPARING]: 'text-yellow-600',
  [ORDER_STATUS.DELIVERING]: 'text-blue-600',
  [ORDER_STATUS.DELIVERED]: 'text-green-600',
  [ORDER_STATUS.CANCELED]: 'text-red-600',
};

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

        const circleBgClass = isCompleted
          ? 'bg-green-500'
          : isCurrent
            ? statusBackgroundColors[status]
            : 'bg-gray-300';

        const textClass = isCurrent
          ? statusTextColors[status]
          : 'text-gray-500';

        return (
          <React.Fragment key={status}>
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm transition-colors duration-300 ${circleBgClass}`}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <p className={`mt-1 text-[0.6rem] sm:text-xs font-medium ${textClass}`}>
                {status}
              </p>            </div>
            {index < STATUS_SEQUENCE.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-colors duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
