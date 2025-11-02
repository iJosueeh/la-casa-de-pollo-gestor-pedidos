import type { Product } from '@/features/products/types';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
