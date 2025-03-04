"use client"
import FeaturedProduct from '@/components/FeaturedProduct';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
    // Sample cart data
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "https://placehold.co/100",
            quantity: 2,
        },
        {
            id: 2,
            name: "Leather Jacket",
            price: 149.99,
            image: "https://placehold.co/100",
            quantity: 1,
        },
        {
            id: 3,
            name: "Smart Watch",
            price: 199.99,
            image: "https://placehold.co/100",
            quantity: 1,
        },
    ]);

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Handle quantity change with proper validation
    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1 || isNaN(newQuantity)) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Handle item removal
    const handleRemoveItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                {/* Cart Header */}
                <section className="py-8">
                    <h3 className="text-3xl">Your <span className="text-primary">Cart</span></h3>
                    <p className="text-gray-400 mb-8">Review your items and proceed to checkout.</p>
                </section>

                {/* Cart Items */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="card border border-base-300 shadow-sm p-4 mb-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        <div className="avatar">
                                            <div className="w-24 h-24 rounded-lg">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold">{item.name}</h2>
                                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value, 10);
                                                    handleQuantityChange(item.id, newQuantity);
                                                }}
                                                className="input input-bordered w-20"
                                                min="1"
                                            />
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="btn btn-ghost text-error"
                                            >
                                                <FaTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="card border border-base-300 shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            {/* Subtotal */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>

                            {/* Shipping */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-semibold">$0.00</span>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between border-t border-base-300 pt-4">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button className="btn btn-primary w-full mt-6">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <FeaturedProduct />
            <Footer />
        </>
    );
};

export default CartPage;
