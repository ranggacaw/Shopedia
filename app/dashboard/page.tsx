import React from "react";
import HomeLayout from "./homewrapper";
import Link from "next/link";
import { FaHome, FaLaptop, FaTshirt } from "react-icons/fa";
import { TbPerfume } from "react-icons/tb";

const HomePage: React.FC = () => {
    const categories = [
        { name: "Electronics", icon: <FaLaptop className="w-6 h-5 mb-1" /> },
        { name: "Clothing", icon: <FaTshirt className="w-6 h-5 mb-1" /> },
        { name: "Home & Kitchen", icon: <FaHome className="w-6 h-5 mb-1" /> },
        { name: "Fragrance", icon: <TbPerfume className="w-6 h-5 mb-1" /> },
    ];

    return (
        <HomeLayout>
            {/* Hero Section */}
            <section className="bg-base-200 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-4">Welcome to Pelerpedia</h2>
                    <p className="text-lg mb-8">Your one-stop shop for the best products at the best prices.</p>
                    <button className="btn btn-primary">Shop Now</button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto py-16">
                <h3 className="text-3xl font-bold text-center mb-8">Featured Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((product) => (
                    <div 
                        key={product} 
                        className="card bg-base-100 shadow-md"
                    >
                        <figure className="px-4 pt-4">
                            <img
                                src="https://placehold.co/300"
                                alt="Product"
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="card-body">
                            <h4 className="card-title">Product {product}</h4>
                            <p className="text-gray-500">115.000 IDR</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </section>

            {/* Categories */}
            <section className="bg-base-100 py-16">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-8">Shop by Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                            className="card border-2 border-base-200 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <div className="card-body p-3">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <div className="text-accent">
                                        {category.icon}
                                    </div>
                                    <span className="text-base font-semibold text-center text-base-content">
                                        {category.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
};

export default HomePage;