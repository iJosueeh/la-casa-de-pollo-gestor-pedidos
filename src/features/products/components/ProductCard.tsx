import React from 'react';
import type { Product } from '@/features/products/types';
import { Card } from '@/shared/components/iu';
import { useCart } from '@/features/cart/hooks';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addProduct, removeProduct, getProductQuantity } = useCart();
  const quantity = getProductQuantity(product.id);

  return (
    <Card className="h-full flex flex-col">
      {product.image && <img className="w-full h-48 object-cover mb-4 rounded-t-lg" src={product.image} alt={product.name} />}
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-red-600 font-bold text-xl">S/. {product.price.toFixed(2)}</span>
          {quantity === 0 ? (
            <button
              onClick={() => addProduct(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Agregar al Carrito
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => removeProduct(product.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg text-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-md">{quantity}</span>
              <button
                onClick={() => addProduct(product)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};