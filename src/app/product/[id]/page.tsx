'use client';
import { useParams, useRouter } from 'next/navigation';
import ProductCard from "@/components/ProductCard";
import { useCartStore } from '@/lib/cart';
import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Star, Plus, Minus, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [product, setProduct] = useState<any>(null);
    const [similarItems, setSimilarItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                if (data.category) {
                    fetch(`/api/products?category=${encodeURIComponent(data.category)}`)
                        .then(res => res.json())
                        .then(items => setSimilarItems(items.filter((p: any) => p.id !== data.id).slice(0, 4)));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const isOutOfStock = product?.stock <= 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
            <button 
                onClick={() => router.push('/products')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all"
            >
                Back to Shop
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 sm:px-10">
                <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm text-gray-500">
                    <button onClick={() => router.push('/')} className="hover:text-blue-600 transition-colors">Home</button>
                    <ChevronRight size={14} />
                    <button onClick={() => router.push('/products')} className="hover:text-blue-600 transition-colors">Products</button>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">{product.title}</span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-6 sm:p-10">
                <div className="grid lg:grid-cols-2 gap-12 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
                    {/* Image Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative group h-full flex flex-col"
                    >
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8">
                            <motion.img 
                                layoutId={`product-img-${product.id}`}
                                src={product.image} 
                                alt={product.title} 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {product.discount > 0 && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full">
                                -{product.discount}% OFF
                            </span>
                        )}
                    </motion.div>

                    {/* Content Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col h-full"
                    >
                        <div className="mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">{product.title}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" />
                                    ))}
                                    <span className="text-gray-400 text-sm ml-1">({product.reviews} reviews)</span>
                                </div>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <span className={`text-sm font-bold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                                    {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-4xl font-black text-blue-600">৳{product.price}</span>
                                {product.original && (
                                    <span className="text-xl text-gray-400 line-through">৳{product.original}</span>
                                )}
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                        </div>

                        {/* Store Info */}
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
                            <div className="bg-blue-600 p-2 rounded-xl text-white">
                                <Store size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sold by</p>
                                <p className="text-sm font-bold text-gray-900">{product.shopName || "Universal Tech"}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        {!isOutOfStock && (
                            <div className="space-y-6 mt-auto">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={handleAddToCart}
                                        className="grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                                        Add to Cart
                                    </button>
                                    <button className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all text-red-500">
                                        <Heart size={24} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck size={24} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase text-gray-500">Free Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck size={24} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase text-gray-500">Secure Payment</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RotateCcw size={24} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase text-gray-500">7 Days Return</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Similar items */}
                {similarItems.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900">Similar Products</h2>
                            <button onClick={() => router.push('/products')} className="text-blue-600 font-bold hover:underline">View All</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {similarItems.map(item => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
