
import React from 'react';

type TarjetaDashboardProps = {
  title: string;
  value: string | number;
  footer?: string;
  color?: 'white' | 'gradient';
};

const colorClasses = {
  white: 'bg-white text-gray-800',
  gradient: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
};

export const TarjetaDashboard: React.FC<TarjetaDashboardProps> = ({
  title,
  value,
  footer,
  color = 'white',
}) => {
  return (
    <div className={`rounded-lg shadow-md p-6 ${colorClasses[color]}`}>
      <div className="text-sm font-medium uppercase">{title}</div>
      <div className="text-4xl font-bold my-2">{value}</div>
      {footer && <div className="text-xs mt-4 opacity-60">{footer}</div>}
    </div>
  );
};
