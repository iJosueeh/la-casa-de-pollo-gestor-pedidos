
import React from 'react';
import { Drumstick, Soup, Coffee, PlusCircle } from 'lucide-react';
import { useMostSoldProducts } from '../hooks/useMostSoldProducts';


const productIcons: Record<string, React.ElementType> = {
  'Pollo a la Brasa': Drumstick,
  'Combos': Soup, 
  'Bebidas': Coffee,
  'Adicionales': PlusCircle,
  'Unknown': PlusCircle, 
};

type ProductosMasVendidosProps = {
  title?: string;
};

export const ProductosMasVendidos: React.FC<ProductosMasVendidosProps> = ({
  title = 'Productos más Vendidos',
}) => {
  const { products, loading, error } = useMostSoldProducts();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-3 text-gray-600">Cargando productos más vendidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-red-500 h-48 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-48 flex items-center justify-center">
        <p className="text-gray-500">No hay productos más vendidos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {products.map((product) => {
          const Icon = productIcons[product.category] || productIcons.Unknown;
          return (
            <div key={product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                {Icon && <Icon className="w-6 h-6 text-gray-600 mr-3" />}
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  {product.percentage !== undefined && (
                    <p className="text-sm text-gray-500">{product.percentage}% del total</p>
                  )}
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
