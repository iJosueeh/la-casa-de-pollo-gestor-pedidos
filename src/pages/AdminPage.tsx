import { TarjetaDashboard, PedidosRecientes, ProductosMasVendidos, ResumenSemanal  } from '@/features/admin/components';
import React from 'react';
import { useDashboardSummary } from '@/features/admin/hooks/useDashboardSummary';
import { RefreshCw } from 'lucide-react';

export const AdminPage = () => {
  const { summary, loading, error, refetch } = useDashboardSummary();

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mr-2">Dashboard</h1>
        <button
          onClick={refetch}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Actualizar datos del dashboard"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>
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