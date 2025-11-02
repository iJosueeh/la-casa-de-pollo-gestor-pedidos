import React, { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import type { Product } from "@/features/products/types";


export const CartView = () => {
    const { cartItems, addProduct, removeProduct } = useCart();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState("");

    const notify = (message: string) => {
        setNotificationMsg(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const [view, setView] = useState("cart");

    const handleUpdateQuantity = (product: Product, delta: number) => {
        if (delta > 0) {
            addProduct(product);
        } else {
            removeProduct(product.id);
        }
    };

    const handleRemoveFromCart = (productId: string) => {
        removeProduct(productId);
        notify("Producto eliminado");
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="flex-1 p-6 overflow-y-auto">
            {showNotification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notificationMsg}
                </div>
            )}

            {view === "cart" ? (
                <div className="max-w-6xl mx-auto">
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
                                        onClick={() => setView("menu")}
                                        className="mt-6 w-full bg-linear-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg"
                                    >
                                        Ver Menú
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4"
                                    >
                                        <div className="bg-linear-to-br from-red-100 to-orange-100 w-20 h-20 rounded-lg flex items-center justify-center text-4xl">
                                            {item.image}
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
                            <div className="lg:col-span-1">
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
                                        className="w-full bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg font-bold"
                                    >
                                        Confirmar Pedido
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto text-center p-12">
                    <h2 className="text-2xl font-bold mb-4">Vista de Menú</h2>
                    <p>Aquí se mostraría el menú de productos.</p>
                    <button
                        onClick={() => setView("cart")}
                        className="mt-6 bg-linear-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-lg"
                    >
                        Volver al Carrito
                    </button>
                </div>
            )}

            
        </div>
    );
};