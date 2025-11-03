import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DailySalesData {
  day: string;
  earnings: number;
}

const initialData: DailySalesData[] = [
  { day: 'Lunes', earnings: 1200 },
  { day: 'Martes', earnings: 1500 },
  { day: 'Miércoles', earnings: 1300 },
  { day: 'Jueves', earnings: 1700 },
  { day: 'Viernes', earnings: 2000 },
];

interface ResumenSemanalProps {
  data?: DailySalesData[];
}

export const ResumenSemanal: React.FC<ResumenSemanalProps> = ({ data = initialData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Resumen Semanal de Ventas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
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
