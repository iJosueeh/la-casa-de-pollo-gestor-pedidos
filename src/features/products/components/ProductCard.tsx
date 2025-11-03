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
    console.log('Adding product to cart:', product);
    addProduct(product);
  };

  return (
    <Card className="h-full flex flex-col relative">
      {product.image && <img className="w-full h-48 object-cover mb-4 rounded-t-lg" src={product.image} alt={product.name} />}
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-red-600 font-bold text-xl">S/. {product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold p-2 rounded-lg text-sm flex items-center justify-center w-8 h-8 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};