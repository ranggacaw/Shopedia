"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Image {
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
    images: Image[];
}

const FeaturedProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

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
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <section className="container max-w-7xl mx-auto py-16 px-6">
            <h3 className="text-3xl">
                Featured <span className="text-primary">Products</span>
            </h3>
            <p className="text-gray-400 mb-8">
                Don't wait. Just grab fast our featured products!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.slice(0, 4).map((product) => (
                        <Link 
                            href="#" 
                            key={product.id} 
                            className="card shadow-md p-4"
                        >
                            {/* Gambar Produk */}
                            <img
                                src={product.images.length > 0 ? product.images[0].url : "https://via.placeholder.com/150"}
                                alt={product.name}
                                className="w-full h-52 object-cover rounded-md aspect-square"
                            />

                            {/* Info Produk */}
                            <p className="text-sm text-gray-500 py-2">{product.category}</p>
                            <p className="text-sm py-1">{product.name}</p>
                            <p className="text-sm font-bold">Rp. {formatPrice(product.price)}</p>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No featured products available.</p>
                )}
            </div>
        </section>
    );
};

export default FeaturedProduct;
