"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Store, Star, MapPin, Users, Info, ChevronRight, ShieldCheck, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ShopDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    
    const [shop, setShop] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        
        const fetchShopData = async () => {
            setLoading(true);
            try {
                // Fetch Shop Details
                const shopRes = await fetch(`/api/shops/${id}`);
                if (shopRes.ok) {
                    const shopData = await shopRes.json();
                    setShop(shopData);
                    
                    // Fetch Shop Products
                    const productsRes = await fetch(`/api/products?shopId=${id}`);
                    if (productsRes.ok) {
                        const productsData = await productsRes.json();
                        setProducts(productsData);
                    }
                }
            } catch (error) {
                console.error("Error fetching shop data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchShopData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!shop) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Store not found</h1>
            <button 
                onClick={() => router.push('/shops')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all"
            >
                Back to All Stores
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[400px] overflow-hidden">
                <img 
                    src={shop.cover_url || "/covers/StyleNest.jpg"} 
                    alt={shop.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end gap-6">
                        {/* Logo */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white p-1.5 shadow-2xl border-4 border-white overflow-hidden shrink-0"
                        >
                            <img 
                                src={shop.logo_url || "/logos/StyleNest.png"} 
                                alt={shop.name} 
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </motion.div>
                        
                        {/* Summary */}
                        <div className="grow pb-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-2"
                            >
                                <h1 className="text-4xl sm:text-5xl font-black text-white">{shop.name}</h1>
                                <div className="bg-blue-500 text-white p-1 rounded-full">
                                    <ShieldCheck size={20} fill="currentColor" className="text-blue-200" />
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-bold"
                            >
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    <span>{shop.rating || "4.8"} (2.4k+ Reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-blue-400" />
                                    <span>12.5k Followers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-red-400" />
                                    <span>Dhaka, Bangladesh</span>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-4 pb-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2">
                                Follow Store
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-4 py-3 rounded-2xl transition-all">
                                <Info size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-7xl mx-auto p-6 sm:p-10">
                <div className="grid lg:grid-cols-4 gap-10">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* About */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">About Store</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {shop.description || "Welcome to our official flagship store. We provide the highest quality products with exceptional customer service and fast delivery across Bangladesh."}
                            </p>
                            <div className="space-y-4 pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone size={16} className="text-blue-500" />
                                    <span>+880 1234-567890</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} className="text-blue-500" />
                                    <span>support@shopexample.com</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Categories (Optional/Placeholder) */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {["All Products", "New Arrivals", "Best Sellers", "Flash Sale"].map(cat => (
                                    <button 
                                        key={cat}
                                        className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center justify-between group"
                                    >
                                        {cat}
                                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900">Store Products</h2>
                            <div className="text-sm text-gray-500 font-bold">{products.length} Items found</div>
                        </div>
                        
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-20 text-center">
                                <Store size={48} className="text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold italic">No products currently listed for this store.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

