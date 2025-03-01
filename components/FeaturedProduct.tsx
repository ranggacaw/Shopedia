import React from 'react'
import products from "@/data/shopdata";

const FeaturedProduct = () => {
  return (
    <>
        <section className="container max-w-7xl mx-auto py-16 px-6">
            <h3 className="text-3xl">Featured <span className="text-primary">Products</span></h3>
            <p className="text-gray-400 mb-8">Dont wait. Just grab fast our featured products!</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
                    <div 
                        key={product.id} 
                        className="card bg-base-100 shadow-md"
                    >
                        <figure className="px-2 pt-2">
                            <img
                                src={product.image}
                                alt="Product"
                                className="rounded-xl object-cover aspect-square max-w-52"
                            />
                        </figure>
                        <div className="card-body pb-4">
                            <p className="m-0 text-gray-400">{product.category}</p>
                            <h6 className="text-base">{product.name}</h6>
                            <p className="font-bold">{product.price} IDR</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default FeaturedProduct