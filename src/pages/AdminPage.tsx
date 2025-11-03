import { TarjetaDashboard, PedidosRecientes, ProductosMasVendidos, ResumenSemanal  } from '@/features/admin/components';
import React from 'react';

export const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TarjetaDashboard
          title="Ventas hoy"
          value="S/ 2,450.00"
          footer="+12% que ayer"
          color="gradient"
        />
        <TarjetaDashboard
          title="Pedidos Hoy"
          value="24"
          footer="+8% que ayer"
          color="white"
        />
        <TarjetaDashboard
          title="Ticket promedio"
          value="S/ 102.00"
          footer="-5% que ayer"
          color="gradient"
        />
        <TarjetaDashboard
          title="Satisfacción del cliente"
          value="4.8/5"
          footer="Excelente"
          color="white"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PedidosRecientes />
        <ProductosMasVendidos />
      </div>
      <div className="w-full">
        <ResumenSemanal />
      </div>
    </div>
  );
};