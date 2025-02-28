"use client"

import React, { useState } from 'react'
import { BiFilter } from "react-icons/bi";
import Header from '@/components/Header';
import products from '@/data/shopdata'
import Link from 'next/link';


const ShopPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    // Search product
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <Header/>

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
                                <button onClick={() => setSelectedCategory("Electronics")}>
                                    Electronics
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedCategory("Clothing")}>
                                    Clothing
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedCategory("Home & Kitchen")}>
                                    Home & Kitchen
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedCategory("Fragrance")}>
                                    Fragrance
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                       <Link 
                            key={product.id} 
                            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                            href={`http://localhost:3000/item-details/1`}
                        >
                            <figure className="px-4 pt-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded-xl w-full aspect-square object-cover"
                                />
                            </figure>
                            
                            {/* Details */}
                            <div className="card-body px-4 py-2">
                                <h5 className="card-title text-base mb-0 text-gray-800">{product.name}</h5>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 font-medium">{product.price.toFixed(3)} IDR</p>
                                    <button className="btn btn-sm btn-outline btn-primary">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;