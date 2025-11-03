
import React from 'react';
import { Drumstick, Soup, Coffee, PlusCircle } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  category: 'Pollo a la Brasa' | 'Combos' | 'Bebidas' | 'Adicionales';
  percentage: number;
  salesAmount: number;
};

const productIcons = {
  'Pollo a la Brasa': Drumstick,
  Combos: Soup, 
  Bebidas: Coffee,
  Adicionales: PlusCircle,
};

const topProducts: Product[] = [
  { id: 'P001', name: '1/4 Pollo + Papas', category: 'Pollo a la Brasa', percentage: 29.40, salesAmount: 142 },
  { id: 'P002', name: 'Combo Familiar', category: 'Combos', percentage: 20.29, salesAmount: 98 },
  { id: 'P003', name: 'Inka Cola 1.5L', category: 'Bebidas', percentage: 15.74, salesAmount: 76 },
  { id: 'P004', name: 'Papas Fritas Grandes', category: 'Adicionales', percentage: 13.46, salesAmount: 65 },
  { id: 'P005', name: '1/2 Pollo + Ensalada', category: 'Pollo a la Brasa', percentage: 21.12, salesAmount: 102 },
];

type ProductosMasVendidosProps = {
  title?: string;
  products?: Product[];
};

export const ProductosMasVendidos: React.FC<ProductosMasVendidosProps> = ({
  title = 'Productos más Vendidos',
  products = topProducts,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {products.map((product) => {
          const Icon = productIcons[product.category];
          return (
            <div key={product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                {Icon && <Icon className="w-6 h-6 text-gray-600 mr-3" />}
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.percentage}% del total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{product.salesAmount}</p>
                <p className="text-sm text-gray-500">ventas</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
