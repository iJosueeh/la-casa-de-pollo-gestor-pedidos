import React from 'react';
import type { OrderStatus } from '@/features/orders/types/order.types';

interface OrderStatusTagProps {
  status: OrderStatus;
  isInteractive?: boolean; // If it's a button, it might have different styling
  isSelected?: boolean; // For interactive status tags (buttons)
  onClick?: (status: OrderStatus) => void; // For interactive status tags (buttons)
}

const statusColors = {
  Pendiente: 'bg-orange-100 text-orange-800',
  "En preparación": 'bg-yellow-100 text-yellow-800',
  "En reparto": 'bg-blue-100 text-blue-800',
  Entregado: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
};

const statusBorderColors = {
  Pendiente: 'border-orange-500',
  "En preparación": 'border-yellow-500',
  "En reparto": 'border-blue-500',
  Entregado: 'border-green-500',
  Cancelado: 'border-red-500',
};

export const OrderStatusTag: React.FC<OrderStatusTagProps> = ({
  status,
  isInteractive = false,
  isSelected = false,
  onClick,
}) => {
  const baseClasses = `px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`;

  if (isInteractive) {
    const interactiveClasses = `
      ${baseClasses}
      ${isSelected ? `border-2 ${statusBorderColors[status]}` : 'border border-transparent'}
      cursor-pointer transition-all duration-200
    `;
    return (
      <button onClick={() => onClick && onClick(status)} className={interactiveClasses}>
        {status}
      </button>
    );
  }

  return (
    <span className={baseClasses}>
      {status}
    </span>
  );
};