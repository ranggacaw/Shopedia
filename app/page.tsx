import React from "react";
import HomeLayout from "./dashboard/homewrapper";
import Link from "next/link";
import categories from "@/data/categoriesdata";
import services from "@/data/servicesdata";
import FeaturedProduct from "@/components/FeaturedProduct";
import NewArrival from "@/components/NewArrival";

const HomePage: React.FC = () => {

    return (
        <HomeLayout>
            {/* Hero Section */}
            <section className="bg-base-200 py-20 bg-[url('https://wishfarms.com/wp-content/uploads/2020/02/mixed-berry-basket-bg.jpg')] bg-cover bg-no-repeat bg-center">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-4 text-slate-200">Welcome to Shopedia</h2>
                    <p className="text-lg mb-8 text-slate-200">Your one-stop shop for the everythings fresh at the best prices.</p>
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

            {/* Categories */}
            <section className="bg-base-100 py-16 pb-6">
                <div className="container mx-auto text-center">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 px-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                            className="card transition-all duration-200 shadow-md hover:shadow-xl shadow-[#E2FDE2] hover:shadow-[#FFE9E9]"
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

            {/* Featured Products */}
            <FeaturedProduct />

            {/* Sale Hero */}
            <section className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    {/* Hero Section */}
                    <div className="hero min-h-[30vh] rounded-md" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/circular-candy-compositions-space_23-2147663196.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40 rounded-md"></div>
                        <div className="hero-content text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-4xl">Testy Snack & Fastfood</h1>
                            <p className="mb-5">The Flavor Of Something Special</p>
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                        </div>
                    </div>

                    {/* Fresh Fruits & Veggies Section */}
                    <div className="hero min-h-[30vh] rounded-md" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/033/107/945/small_2x/fresh-fruits-food-background-web-banner-with-copy-space-generative-ai-photo.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40 rounded-md"></div>
                        <div className="hero-content text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-4xl">Fresh Fruits & Veggies</h1>
                            <p className="mb-5">A Healthy Meal For Every One</p>
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <NewArrival />

            {/* Services */}
            <section className="bg-base-100 py-16 pb-40">
                <div className="container mx-auto text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                    {services.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                            className="card transition-all "
                        >
                            <div className="card-body p-3">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <div className="text-primary">
                                        {category.icon}
                                    </div>
                                    <span className="text-lg font-semibold text-center text-base-content">
                                        {category.name}
                                    </span>
                                    <span className="text-base text-center text-gray-500">
                                        {category.description}
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