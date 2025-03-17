import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    if (!product) return <p>Loading...</p>;

    return (
        <Link  className="product flex flex-col border px-3 py-4 min-h-[320px] h-full" to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>

            <img 
                className="w-40 mb-5 ease-in-out duration-300 transform hover:scale-110 mx-auto" 
                src={product.image?.[0] || "fallback-image.jpg"} 
                alt={product.name} 
            />
            <h3 className="hover:text-[#2f80ed]">{product.name}</h3>
            <p className="text-lg text-red-500 font-bold py-1">{product.price} ₫</p>
            <div className="mt-auto w-full">
                <button 
                    type="button" 
                    className="text-cyan-600 text-xs bg-cyan-100 rounded-lg py-2 font-bold w-full">
                    Mua ngay
                </button>
            </div>
        </Link>
    );
}
