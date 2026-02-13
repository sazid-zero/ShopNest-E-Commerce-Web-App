"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Store, ChevronRight, Star, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Shops() {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const res = await fetch('/api/shops');
                if (res.ok) {
                    const data = await res.json();
                    setShops(data);
                }
            } catch (error) {
                console.error("Failed to fetch shops", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShops();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-12 px-6 sm:px-10 text-center">
                <div className="max-w-7xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
                    >
                        Browse All Store
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto"
                    >
                        Discover top-rated sellers and exclusive deals from our trusted partners across the country.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {shops.map((shop, index) => (
                        <motion.div
                            key={shop.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(`/shops/${shop.id}`)}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
                        >
                            {/* Cover Image */}
                            <div className="h-44 relative bg-gray-200 overflow-hidden">
                                <img 
                                    src={shop.cover_url || "/covers/StyleNest.jpg"} 
                                    alt={shop.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                            </div>

                            {/* Info */}
                            <div className="p-6 relative">
                                {/* Logo Overlay */}
                                <div className="absolute -top-12 left-6 w-20 h-20 rounded-2xl bg-white p-1 shadow-lg overflow-hidden border-2 border-white">
                                    <img 
                                        src={shop.logo_url || "/logos/StyleNest.png"} 
                                        alt={`${shop.name} logo`} 
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        {shop.name}
                                        <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full">
                                            <ShieldCheck size={14} fill="currentColor" className="text-white" />
                                        </div>
                                    </h2>
                                    <p className="text-gray-500 text-sm line-clamp-2 mt-2 leading-relaxed">
                                        {shop.description || "Top rated seller with amazing products and service quality."}
                                    </p>

                                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rating</span>
                                            <div className="flex items-center gap-1 text-gray-900 font-bold">
                                                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                                <span>{shop.rating || "4.8"}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Followers</span>
                                            <div className="flex items-center gap-1 text-gray-900 font-bold">
                                                <Users size={14} className="text-blue-400" />
                                                <span>{shop.followers || "1.2k"}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</span>
                                            <div className="flex items-center gap-1 text-gray-900 font-bold">
                                                <MapPin size={14} className="text-red-400" />
                                                <span>Dhaka</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ShieldCheck({ size, fill, className }: { size: number, fill: string, className: string }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill={fill} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
