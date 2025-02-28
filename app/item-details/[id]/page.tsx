"use client"

import Header from "@/components/Header";
import { SetStateAction, useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ItemDetailsPage = () => {
    // Sample product data
    const product = {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://i1.sndcdn.com/artworks-Nhmz9yxvJPHuaPtB-yp08hA-t240x240.jpg",
        description:
        "High-quality wireless headphones with noise cancellation and long battery life.",
        rating: 4.5,
        reviews: 120,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Blue"],
    };

    // State for selected options
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [quantity, setQuantity] = useState(1);

    // Handle quantity change
    const handleQuantityChange = (newQuantity: SetStateAction<number>) => {
        if (typeof newQuantity === 'number' && newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    // Handle Add to Cart
    const handleAddToCart = () => {
        const item = {
            ...product,
            size: selectedSize,
            color: selectedColor,
            quantity,
        };

        console.log("Added to Cart:", item);
    };

    return (
        <>
            <Header />

            <div className="container mx-auto p-6">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
                    {/* Product Image */}
                    <div className="card border border-base-300 shadow-sm p-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded-lg w-full aspect-square"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="space-y-6">
                        {/* Product Name and Rating */}
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}
                                    />
                                    ))}
                                </div>
                                <span className="text-gray-600">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Price */}
                        <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>

                        {/* Description */}
                        <p className="text-gray-600">{product.description}</p>

                        {/* Size Selector */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Size</span>
                            </label>
                            <div className="flex space-x-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`btn btn-sm ${
                                            selectedSize === size ? "btn-primary" : "btn-ghost"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Color</span>
                            </label>
                            <div className="flex space-x-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`btn btn-sm ${
                                            selectedColor === color ? "btn-primary" : "btn-ghost"
                                        }`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    >
                                        {selectedColor === color ? "✓" : ""}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="btn btn-sm btn-ghost"
                                >
                                    -
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="btn btn-sm btn-ghost"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-primary w-full"
                        >
                            <FaShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ItemDetailsPage;