import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWeeklySalesSummary } from '../hooks/useWeeklySalesSummary';


interface ResumenSemanalProps {
  
}

export const ResumenSemanal: React.FC<ResumenSemanalProps> = () => {
  const { summary, loading, error } = useWeeklySalesSummary();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-3 text-gray-600">Cargando resumen semanal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-red-500 h-80 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (summary.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No hay datos de ventas para esta semana.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Resumen Semanal de Ventas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={summary}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value: number) => `S/ ${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="earnings" fill="#FF6347" name="Ganancias" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
