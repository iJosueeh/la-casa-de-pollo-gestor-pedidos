import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../store/cartSlice';
import type { RootState } from '@/store';
import type { Product } from "@/features/products/types/product.types";
import { useNotificationContext } from '@/shared/context/NotificationContext';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { showNotification } = useNotificationContext();

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
    showNotification(`Producto ${product.name} agregado al carrito!`, 'success');
  };

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  const getProductQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    getProductQuantity,
    cartItems,
  };
};
