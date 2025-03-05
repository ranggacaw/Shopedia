"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useCart } from "./CartProvider";

interface ImageType {
    id: number;
    url: string;
    productId: number;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: ImageType[];
}

type CartItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: { url: string }[];
    quantity: number;
};

const QuantitySelector = ({
    quantity,
    onIncrease,
    onDecrease,
}: {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}) => {
    return (
        <div className="flex items-center gap-4 mt-4">
            <button className="btn btn-outline btn-sm" onClick={onDecrease} disabled={quantity <= 1}>
                <BiMinus />
            </button>
            <span className="text-lg">{quantity}</span>
            <button className="btn btn-outline btn-sm" onClick={onIncrease}>
                <BiPlus />
            </button>
        </div>
    );
};

const NewArrival: React.FC = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get("http://localhost:3001/product");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProduct();
    }, []);

    const formatPrice = (price: number): string => {
        return price.toLocaleString("id-ID", { minimumFractionDigits: 0 });
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1); // Reset quantity
        modalRef.current?.showModal();
    };

    const closeModal = () => {
        setSelectedProduct(null);
        modalRef.current?.close();
    };

    return (
        <section className="container mx-auto py-16 px-6">
            <h3 className="text-3xl">
                New <span className="text-primary">Arrivals</span>
            </h3>
            <p className="text-gray-400 mb-8">Let&apos;s checking out and get free shipping!</p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {products.slice(3, 8).map((product) => (
                    <button key={product.id} className="card bg-base-100 shadow-md text-start" onClick={() => openModal(product)}>
                        <figure className="px-4 pt-4">
                            <Image
                                src={product.images.length > 0 ? product.images[0].url : "https://via.placeholder.com/150"}
                                alt={product.name}
                                width={300}
                                height={300}
                                unoptimized
                                className="rounded-xl object-cover aspect-square max-w-52"
                            />
                        </figure>
                        <div className="card-body px-4 pb-4">
                            <p className="m-0 text-gray-400">{product.category}</p>
                            <h6 className="text-sm">{product.name}</h6>
                            <p className="font-bold text-sm">Rp. {formatPrice(product.price)}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Modal */}
            <dialog ref={modalRef} className="modal">
                {selectedProduct && (
                    <div className="modal-box w-full max-w-3xl p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Side */}
                            <div className="w-full md:w-1/2 border border-gray-100 rounded-sm">
                                <Image
                                    src={selectedProduct.images.length > 0 ? selectedProduct.images[0].url : "https://via.placeholder.com/300"}
                                    width={300}
                                    height={300}
                                    unoptimized
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover rounded-md aspect-square"
                                />
                            </div>

                            {/* Right Side */}
                            <div className="w-full md:w-1/2 flex flex-col">
                                <h3 className="text-2xl font-bold text-[#4b5966]">{selectedProduct.name}</h3>
                                <p className="text-gray-500">{selectedProduct.category}</p>
                                <p className="text-sm mt-2">{selectedProduct.description}</p>
                                <p className="text-xl font-bold mt-4 text-[#4b5966]">Rp. {formatPrice(selectedProduct.price)}</p>

                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrease={() => setQuantity((prev) => prev + 1)}
                                    onDecrease={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                                />

                                <div className="flex-grow"></div>

                                {/* Modal Footer */}
                                <div className="modal-action mt-6 flex gap-4 sticky bottom-0 bg-white">
                                    <button
                                        className="btn btn-primary flex-1"
                                        onClick={() => {
                                            addToCart({
                                                id: selectedProduct.id,
                                                name: selectedProduct.name,
                                                category: selectedProduct.category,
                                                price: selectedProduct.price,
                                                description: selectedProduct.description,
                                                images: selectedProduct.images,
                                                quantity: quantity, // ✅ Ensure quantity is included
                                            });
                                            closeModal();
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="btn flex-1" onClick={closeModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </dialog>
        </section>
    );
};

export default NewArrival;
