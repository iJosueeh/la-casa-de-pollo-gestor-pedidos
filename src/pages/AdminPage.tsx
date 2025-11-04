import { TarjetaDashboard, PedidosRecientes, ProductosMasVendidos, ResumenSemanal  } from '@/features/admin/components';
import React from 'react';
import { useDashboardSummary } from '@/features/admin/hooks/useDashboardSummary'; 

export const AdminPage = () => {
  const { summary, loading, error } = useDashboardSummary(); 

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando resumen del dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error al cargar el resumen del dashboard: {error}</p>
      </div>
    );
  }


  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;


  const getComparisonFooter = (todayValue: number, yesterdayValue: number, unit: string = '', isCurrency: boolean = false) => {
    const formatValue = (value: number) => {
      if (isCurrency) {
        return `S/ ${value.toFixed(2)}`;
      }
      return value.toFixed(0); 
    };

    if (yesterdayValue === 0) {
      return todayValue > 0 ? `+${formatValue(todayValue)} que ayer` : `Sin ${unit} ayer`;
    }

    const difference = todayValue - yesterdayValue;
    const percentage = (difference / yesterdayValue) * 100;
    const sign = percentage >= 0 ? '+' : '';

    
    if (Math.abs(percentage) < 0.5) { 
      return `0% que ayer`;
    }

    return `${sign}${percentage.toFixed(0)}% que ayer`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TarjetaDashboard
          title="Ventas hoy"
          value={`S/ ${summary?.salesToday.toFixed(2) || '0.00'}`}
          footer={getComparisonFooter(summary?.salesToday || 0, summary?.salesYesterday || 0, 'ventas', true)}
          color="gradient"
        />
        <TarjetaDashboard
          title="Pedidos Hoy"
          value={summary?.ordersToday.toString() || '0'}
          footer={getComparisonFooter(summary?.ordersToday || 0, summary?.ordersYesterday || 0, 'pedidos', false)}
          color="white"
        />
        <TarjetaDashboard
          title="Ticket promedio"
          value={`S/ ${summary?.averageTicket.toFixed(2) || '0.00'}`}
          footer={getComparisonFooter(summary?.averageTicket || 0, summary?.averageTicketYesterday || 0, 'ticket', true)}
          color="gradient"
        />
        <TarjetaDashboard
          title="Tasa de cancelación"
          value={formatPercentage(summary?.cancellationRate || 0)}
          footer="De todas las ventas" 
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