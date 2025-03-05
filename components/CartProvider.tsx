"use client"

import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void; // Add this
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Add this function
    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity } // Properly increment quantity
                        : i
                );
            }
            return [...prevCart, { ...item, quantity: item.quantity ?? 1 }]; // Ensure quantity is always set
        });
    };
    
    

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
