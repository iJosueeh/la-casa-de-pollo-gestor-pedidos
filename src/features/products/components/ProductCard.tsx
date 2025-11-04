import React from 'react';
import type { Product } from "@/features/products/types/product.types";
import { Card } from '@/shared/components/iu';
import { useCart } from '@/features/cart/hooks';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addProduct } = useCart();

  const handleAddToCart = () => {
    addProduct(product);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200/60">
      <div className="relative">
        {product.imageUrl ? (
          <img 
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            src={product.imageUrl} 
            alt={product.name} 
          />
        ) : (
          <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-red-600 font-extrabold text-xl sm:text-2xl">S/. {product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            aria-label={`Añadir ${product.name} al carrito`}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold p-2 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-110 z-10"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};