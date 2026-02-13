'use client';
import { allProducts } from "@/lib/products";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

import { useState, useEffect } from "react";

export default function BestSelling() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products?type=best-seller")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    const bestProducts = products;
    const router = useRouter();


    const handleViewAllClick = () => {
        router.push("/products?type=best-seller");
    };

    if (loading) return <div className="py-10 text-center">Loading Best Sellers...</div>;

    return (

        <section className="py-10 px-6 sm:px-10">
            <span className="flex gap-1 items-center mb-6">
                <img src="/bar.png" alt="bar" className="h-6 w-10" />
                <p className="text-blue-600 font-bold text-lg"> This Month's </p>
            </span>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🔥 Best Selling</h2>
                <button
                    onClick={handleViewAllClick}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                >
                    View All Products
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {bestProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}