"use client"

import axios from 'axios'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

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

const NewArrival: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:3001/product');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProduct();
    }, [])

    const formatPrice = (price: number): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <section className="container mx-auto py-16 px-6">
            <h3 className="text-3xl">New <span className="text-primary">Arrivals</span></h3>
            <p className="text-gray-400 mb-8">Let&apos;s checking out and get free shipping!</p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {products.slice(3, 8).map((product) => (
                <div 
                    key={product.id} 
                    className="card bg-base-100 shadow-md"
                >
                    <figure className="px-4 pt-4">
                        {/* Gambar Produk */}
                        <Image
                            src={product.images.length > 0 ? product.images[0].url : "https://via.placeholder.com/150"}
                            alt={product.name}
                            width={300}
                            height={300}
                            unoptimized
                            className="rounded-xl object-cover aspect-square max-w-52"
                        />
                    </figure>
                    <div className="card-body pb-4">
                        <p className="m-0 text-gray-400">{product.category}</p>
                        <h6 className="text-base">{product.name}</h6>
                        <p className="font-bold">Rp. {formatPrice(product.price)}</p>
                    </div>
                </div>
            ))}
            </div>
        </section>
    )
}

export default NewArrival