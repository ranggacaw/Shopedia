import React from "react";
import HomeLayout from "./dashboard/homewrapper";
import Link from "next/link";
import { FaHome, FaLaptop, FaTshirt } from "react-icons/fa";
import { TbPerfume } from "react-icons/tb";
import products from "@/data/shopdata";

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
            <section className="bg-base-200 py-20 bg-[url('https://cdn.prod.website-files.com/605826c62e8de87de744596e/63f5e30a4d577354fdfce512_Duotone-Master-ssssFile-copy.jpg')] bg-cover bg-no-repeat bg-center">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-4 text-slate-200">Welcome to Shopedia</h2>
                    <p className="text-lg mb-8 text-slate-200">Your one-stop shop for the best products at the best prices.</p>
                    <a className="group relative inline-block focus:ring-3 focus:outline-hidden" href="/shop">
                        <span
                            className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                        ></span>

                        <span
                            className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold tracking-widest text-black uppercase"
                        >
                            Shop Now
                        </span>
                    </a>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container max-w-6xl mx-auto py-16">
                <h3 className="text-3xl font-bold text-center mb-8">Featured Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product) => (
                    <div 
                        key={product.id} 
                        className="card bg-base-100 shadow-md"
                    >
                        <figure className="px-4 pt-4">
                            <img
                                src={product.image}
                                alt="Product"
                                className="rounded-xl object-cover"
                                style={{height:'300px', width: '400px'}}
                            />
                        </figure>
                        <div className="card-body">
                            <h4 className="card-title">{product.name}</h4>
                            <p className="text-gray-500">{product.price}</p>
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