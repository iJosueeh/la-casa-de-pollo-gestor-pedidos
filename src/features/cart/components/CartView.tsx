import React, { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import type { Product } from "@/features/products/types";
import { createOrder } from '@/features/orders/services';
import { useNotificationContext } from '@/shared/context/NotificationContext';
import { clearCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { ClientFormModal } from './ClientFormModal'; // Import the new modal

export const CartView = () => {
    const { cartItems, addProduct, removeProduct } = useCart();
    const { showNotification } = useNotificationContext();
    const dispatch = useDispatch();

    const [isClientModalOpen, setIsClientModalOpen] = useState(false);

    const handleUpdateQuantity = (product: Product, delta: number) => {
        if (delta > 0) {
            addProduct(product);
        } else {
            removeProduct(product.id);
        }
    };

    const handleRemoveFromCart = (productId: string) => {
        removeProduct(productId);
        showNotification("Producto eliminado del carrito!", "info");
    };

    const handleConfirmOrderClick = () => {
      if (cartItems.length === 0) {
        showNotification("El carrito está vacío, no se puede confirmar el pedido.", "info");
        return;
      }
      setIsClientModalOpen(true); // Open the client form modal
    };

    const handleClientConfirmed = async (clientInfo: { clientId: number; nombrecliente: string; direccion?: string; notas?: string }) => {
      try {
        // Now that we have clientInfo, proceed with order creation
        const order = await createOrder(cartItems, clientInfo);
        if (order) {
          showNotification("Pedido confirmado con éxito!", "success");
          dispatch(clearCart()); // Clear the cart after successful order
        } else {
          showNotification("Error al confirmar el pedido.", "error");
        }
      } catch (error: unknown) {
        console.error("Error confirming order:", error);
        showNotification("Error al confirmar el pedido.", "error");
      }
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7x1 mx-autookat">
                <div className="flex items-center justify-between mb-6">
                    <div className="w-6 lg:hidden" />
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                                <button
                                    onClick={() => { /* Navigate to products page */ }}
                                    className="mt-6 w-full bg-linear-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg"
                                >
                                    Ver Menú
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 lg:space-x-10"
                                >
                                    <div className="bg-linear-to-br from-red-100 to-orange-100 w-20 h-20 rounded-lg flex items-center justify-center text-4xl">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {item.description}
                                        </p>
                                        <p className="text-red-600 font-bold">
                                            S/ {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleUpdateQuantity(item, -1)}
                                            className="bg-gray-200 p-2 rounded-lg"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold text-lg w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item, 1)}
                                            className="bg-red-500 text-white p-2 rounded-lg"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="text-red-600 p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                                <h3 className="text-xl font-bold mb-4">Resumen</h3>
                                <div className="space-y-3 mb-6">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span>
                                                {item.name} x{item.quantity}
                                            </span>
                                            <span>
                                                S/ {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t pt-4 mb-6">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total:</span>
                                        <span className="text-red-600">
                                            S/ {cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleConfirmOrderClick}
                                    className="w-full bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg font-bold"
                                >
                                    Confirmar Pedido
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ClientFormModal
              isOpen={isClientModalOpen}
              onClose={() => setIsClientModalOpen(false)}
              onClientConfirmed={handleClientConfirmed}
            />
        </div>
    );
};