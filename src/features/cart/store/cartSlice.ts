import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../types';
import type { Product } from '@/features/products/types';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state: CartState, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeProduct: (state: CartState, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== productId);
        } else {
          existingItem.quantity--;
        }
      }
    },
    clearCart: (state: CartState) => {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;