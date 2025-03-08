"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiMinus, BiPlus } from "react-icons/bi";
import Image from "next/image";
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

const FeaturedProduct: React.FC = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/product");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const formatPrice = (price: number): string => {
        return price.toLocaleString("id-ID", { minimumFractionDigits: 0 });
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1); // Reset quantity
        (document.getElementById("product-modal") as HTMLDialogElement)?.showModal();
    };

    const closeModal = () => {
        setSelectedProduct(null);
        (document.getElementById("product-modal") as HTMLDialogElement)?.close();
    };

    return (
        <section className="container max-w-7xl mx-auto py-16 px-6">
            <h3 className="text-3xl">
                Featured <span className="text-primary">Products</span>
            </h3>
            <p className="text-gray-400 mb-8">
                Don&apos;t wait. Just grab fast our featured products!
            </p>

            {/* Show Cart Count in Navbar */}
            {/* <div className="flex justify-end mb-4">
                <button className="btn btn-primary">
                    Cart ({getCartItemCount()})
                </button>
            </div> */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.slice(0, 4).map((product) => (
                        <button
                            key={product.id}
                            className="card shadow-md p-4 text-left"
                            onClick={() => openModal(product)}
                        >
                            {/* Product Image */}
                            <Image
                                src={
                                    product.images.length > 0
                                        ? product.images[0].url
                                        : "https://via.placeholder.com/150"
                                }
                                width={300}
                                height={300}
                                unoptimized
                                alt={product.name}
                                className="w-full h-52 object-cover rounded-md aspect-square"
                            />

                            {/* Product Info */}
                            <p className="text-sm text-gray-500 py-2">{product.category}</p>
                            <p className="text-sm py-1">{product.name}</p>
                            <p className="text-sm font-bold">Rp. {formatPrice(product.price)}</p>
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">No featured products available.</p>
                )}
            </div>

            {/* Modal */}
            {selectedProduct && (
                <dialog id="product-modal" className="modal">
                    <div className="modal-box w-full max-w-3xl p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Side */}
                            <div className="w-full md:w-1/2 border border-gray-100 rounded-sm">
                                <Image
                                    src={
                                        selectedProduct.images.length > 0
                                            ? selectedProduct.images[0].url
                                            : "https://via.placeholder.com/300"
                                    }
                                    width={300}
                                    height={300}
                                    unoptimized
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover rounded-md aspect-square"
                                />
                            </div>

                            {/* Right Side */}
                            <div className="w-full md:w-1/2 flex flex-col">
                                <h3 className="text-2xl font-bold text-[#4b5966]">
                                    {selectedProduct.name}
                                </h3>
                                <p className="text-gray-500">{selectedProduct.category}</p>
                                <p className="text-sm mt-2">{selectedProduct.description}</p>
                                <p className="text-xl font-bold mt-4 text-[#4b5966]">
                                    Rp. {formatPrice(selectedProduct.price)}
                                </p>

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
                                                price: selectedProduct.price,
                                                quantity: quantity,
                                                image: ""
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
                </dialog>
            )}
        </section>
    );
};

export default FeaturedProduct;
