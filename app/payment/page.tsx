"use client"
import Header from '@/components/Header';
import React, { useState } from 'react';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const handlePayment = () => {
        alert(`Payment successful with ${paymentMethod}`);
    };

    return (
        <>
            <Header />
            
            <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Payment Page</h1>

            <div className="max-w-lg mx-auto border border-gray-300 p-6 rounded-lg shadow-lg">
                {/* Payment Method Selection */}
                <div className="mb-4">
                <label className="block mb-2 font-semibold">Select Payment Method:</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                </select>
                </div>

                {/* Payment Details */}
                {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                    <input
                    type="text"
                    placeholder="Card Number"
                    className="input input-bordered w-full"
                    />
                    <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        className="input input-bordered w-1/2"
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        className="input input-bordered w-1/2"
                    />
                    </div>
                    <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="input input-bordered w-full"
                    />
                </div>
                )}

                {paymentMethod === 'paypal' && (
                <div className="space-y-4">
                    <input
                    type="email"
                    placeholder="PayPal Email"
                    className="input input-bordered w-full"
                    />
                </div>
                )}

                {paymentMethod === 'bank-transfer' && (
                <div className="space-y-4">
                    <input
                    type="text"
                    placeholder="Account Holder Name"
                    className="input input-bordered w-full"
                    />
                    <input
                    type="text"
                    placeholder="Account Number"
                    className="input input-bordered w-full"
                    />
                </div>
                )}

                {/* Submit Button */}
                <button
                onClick={handlePayment}
                className="btn btn-outline btn-success w-full mt-6"
                >
                Confirm Payment
                </button>
            </div>
            </div>
        </>
    );
};

export default PaymentPage;
