'use client';
import { useWishlistStore } from "@/lib/wishlist";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Wishlist() {
    const { wishlistItems } = useWishlistStore();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (wishlistItems.length === 0) {
            setProducts([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`/api/products?ids=${wishlistItems.join(",")}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [wishlistItems]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12 sm:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg shadow-red-200">
                        <Heart size={28} fill="currentColor" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Wishlist</h1>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm"
                    >
                        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={48} className="text-red-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Save items you love and keep track of what you want to buy next!</p>
                        <Link href="/products" className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all group">
                            Explore Products 
                            <ArrowRight size={18} className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}