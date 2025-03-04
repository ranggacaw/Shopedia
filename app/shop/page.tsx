"use client"

import React, { useEffect, useState } from 'react'
import { BiFilter } from "react-icons/bi";
import Header from '@/components/Header';
import Link from 'next/link';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';

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

const ShopPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
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
    
    // Search product
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Header/>
            <div className="flex flex-col min-h-screen bg-base-100 my-20">
                <div className="container mx-auto p-6">

                    {/* Filters and Search Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                        {/* Search Bar */}
                        <div className="flex items-center w-full md:w-auto">
                            <label className="input input-bordered flex items-center gap-2">
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                                </svg>
                            </label>
                        </div>

                        {/* Category Filter */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost">
                                <BiFilter className="w-6 h-6" />
                                <span>Filter by Category</span>
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-20"
                            >
                                <li>
                                    <button onClick={() => setSelectedCategory("All")}>All</button>
                                </li>
                                <li>
                                    <button onClick={() => setSelectedCategory("Vegetables")}>
                                        Vegetables
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSelectedCategory("Dairy & Milk")}>
                                        Dairy & Milk
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSelectedCategory("Juice & Drink")}>
                                        Juice & Drink
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSelectedCategory("Snack & Spice")}>
                                        Snack & Spice
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSelectedCategory("Fruits")}>
                                        Fruits
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setSelectedCategory("Bakery")}>
                                        Bakery
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => (
                        <Link 
                                key={product.id} 
                                className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                href={`http://localhost:3000/item-details/1`}
                            >
                                <figure className="px-4 pt-4">
                                    <Image
                                        src={product.images.length > 0 ? product.images[0].url : "https://via.placeholder.com/150"}
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                        unoptimized
                                        className="rounded-xl w-full aspect-square object-cover"
                                    />
                                </figure>
                                
                                {/* Details */}
                                <div className="card-body px-4 py-2">
                                    <p className="m-0 text-gray-400">{product.category}</p>
                                    <h6 className="text-base">{product.name}</h6>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold">Rp. {formatPrice(product.price)}</p>
                                        <button className="btn btn-xs btn-outline btn-primary">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ShopPage;