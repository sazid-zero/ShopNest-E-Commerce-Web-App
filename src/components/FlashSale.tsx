import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allProducts } from "@/lib/products.ts";
import ProductCard from "./ProductCard";

export default function FlashSale() {
    const [timeLeft] = useState({
        days: "03",
        hours: "23",
        minutes: "19",
        seconds: "56"
    });

    useEffect(() => {
        // Add countdown timer logic here later
    }, []);

    const flashProducts = allProducts.filter((product) => product.type === "flash-sale");
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate("/products?type=flash-sale");
    };

    return (
        <div className="bg-white rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6">
            {/* Header */}
            <span className="flex gap-1 items-center mb-6">
                <img src="/bar.png" alt="bar" className="h-6 w-10" />
                <p className="text-blue-600 font-bold text-lg"> Today's </p>
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">⚡ Flash Sale</h2>
                <div className="flex gap-2 text-sm sm:text-base text-blue-500 font-semibold mt-2 sm:mt-0">
                    <span className="px-2 py-1 bg-blue-100 rounded">{timeLeft.days}d</span>
                    <span className="px-2 py-1 bg-blue-100 rounded">{timeLeft.hours}h</span>
                    <span className="px-2 py-1 bg-blue-100 rounded">{timeLeft.minutes}m</span>
                    <span className="px-2 py-1 bg-blue-100 rounded">{timeLeft.seconds}s</span>
                </div>
            </div>

            {/* Product List */}
            <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar">
                {flashProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-6">
                <button
                    onClick={handleViewAllClick}
                    className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 duration-200 text-white rounded-full shadow-lg hover:scale-105 transition-all hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                    <span className="inline-block align-middle">View All Products</span>
                </button>
            </div>
        </div>
    );
}