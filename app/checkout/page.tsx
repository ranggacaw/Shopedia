"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "@/components/CartProvider";

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const router = useRouter();

    const handlePayment = async () => {
        try {
            const response = await axios.post("http://localhost:3001/checkout", { cart });

            if (response.data.success) {
                clearCart();
                Swal.fire("Payment Successful!", "Thank you for your purchase!", "success");
                router.push("/");
            }
        } catch (error) {
            Swal.fire("Payment Failed", "Please try again", "error");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <div className="bg-gray-100 p-4 rounded-md">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary mt-4" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default CheckoutPage;
