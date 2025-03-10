"use client";
import { useCart } from "@/components/CartProvider";
import FeaturedProduct from "@/components/FeaturedProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartPage = () => {
    const [token, setToken] = useState<string | null>(null);
    const { cart, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Handle quantity change with validation
    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1 || isNaN(newQuantity)) return;
        updateQuantity(id, newQuantity);
    };

    // Format price to Indonesian Rupiah (IDR)
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Handlecheckout
    const handleCheckout = async () => {
        if (cart.length === 0) {
            Swal.fire("Empty Cart", "Your cart is empty.", "warning");
            return;
        }
    
        // Fetch token properly
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            Swal.fire("Login Required", "Please log in to proceed.", "warning");
            router.push("/login");
            return;
        }
    
        try {
            console.log("Sending token:", storedToken); // Debugging token
    
            const response = await fetch("http://localhost:3001/product/checkout", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}` 
                },
                body: JSON.stringify({ userId: 1, cart }), // Use actual userId
            });
    
            const data = await response.json();
            console.log("Server response:", data); // Debug response
    
            if (data.success) {
                Swal.fire("Success", "Transaction successful!", "success");
            } else if (data.message === "Invalid token") {
                console.warn("Invalid token detected, logging out user...");
                
                // Prevent infinite login loop
                localStorage.removeItem("token");
                Swal.fire({
                    title: "Session Expired",
                    text: "Your session has expired. Please log in again.",
                    icon: "error",
                    allowOutsideClick: false, // Prevents accidental closing
                }).then(() => {
                    router.push("/login");
                });
            } else {
                Swal.fire("Transaction Failed", "Something went wrong.", "error");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            Swal.fire("Error", "An error occurred. Please try again.", "error");
        }
    };
    
    

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                {/* Cart Header */}
                <section className="py-8">
                    <h3 className="text-3xl">
                        Your <span className="text-primary">Cart</span>
                    </h3>
                    <p className="text-gray-400 mb-8">
                        Review your items and proceed to checkout.
                    </p>
                </section>

                {/* Cart Items */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2">
                        {cart.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="card border border-base-300 shadow-sm p-4 mb-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        <div className="avatar">
                                            <div className="w-24 h-24 rounded-lg">
                                                <Image
                                                    src={item.image || "/placeholder.jpg"}
                                                    alt={item.name}
                                                    className="rounded-lg"
                                                    width={100}
                                                    height={100}
                                                    unoptimized
                                                />
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold">{item.name}</h2>
                                            <p className="text-gray-600">{formatPrice(item.price)}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-4">
                                        <input
                                            type="number"
                                            value={item.quantity ?? 1}  // Ensure has a default value 1
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value, 10);
                                                handleQuantityChange(item.id, newQuantity);
                                            }}
                                            className="input input-bordered w-20"
                                            min="1"
                                        />

                                            <button
                                                onClick={() => removeFromCart(item.id)}
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
                                <span className="font-semibold">{formatPrice(totalPrice)}</span>
                            </div>

                            {/* Shipping */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-semibold">{formatPrice(0)}</span>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between border-t border-base-300 pt-4">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button 
                                className="btn btn-primary w-full mt-6"
                                onClick={handleCheckout}
                            >
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
