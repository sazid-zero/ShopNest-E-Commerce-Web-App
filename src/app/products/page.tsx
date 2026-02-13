"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@/components/ProductCard";
import { Filter, ChevronRight, SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get("type");
    const categoryQuery = searchParams.get("category");
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Filters
    const [sortOrder, setSortOrder] = useState<string>("latest");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [selectedType, setSelectedType] = useState<string>(type || "all");
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryQuery || "all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                    
                    // Set max price based on actual products
                    if (data.length > 0) {
                        const max = Math.max(...data.map((p: Product) => p.price));
                        setPriceRange([0, max]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const uniqueTypes = useMemo(() => ["all", ...Array.from(new Set(products.map(p => p.type).filter((t): t is string => typeof t === 'string' && t.length > 0)))], [products]);
    const uniqueCategories = useMemo(() => ["all", ...Array.from(new Set(products.map(p => p.category).filter((c): c is string => typeof c === 'string' && c.length > 0)))], [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesType = selectedType === "all" || product.type === selectedType;
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesType && matchesCategory && matchesPrice;
        });

        switch (sortOrder) {
            case "price-asc": result.sort((a, b) => a.price - b.price); break;
            case "price-desc": result.sort((a, b) => b.price - a.price); break;
            case "name-asc": result.sort((a, b) => a.title.localeCompare(b.title)); break;
            case "name-desc": result.sort((a, b) => b.title.localeCompare(a.title)); break;
            default: result.sort((a, b) => b.id - a.id); // Latest
        }
        return result;
    }, [products, selectedType, selectedCategory, priceRange, sortOrder]);

    const handleClearFilters = () => {
        setSelectedType("all");
        setSelectedCategory("all");
        setPriceRange([0, Math.max(...products.map(p => p.price)) || 100000]);
        setSortOrder("latest");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="space-y-4 text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-500 font-medium animate-pulse">Curating your selection...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 sm:px-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <button onClick={() => router.push('/')} className="hover:text-blue-600 transition-colors">Home</button>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">Products</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">{filteredAndSortedProducts.length} Results</span>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <select
                            className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer text-gray-700"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="latest">Sort by: Latest arrivals</option>
                            <option value="price-asc">Sort by: Price low to high</option>
                            <option value="price-desc">Sort by: Price high to low</option>
                            <option value="name-asc">Sort by: Name A-Z</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                    <SlidersHorizontal size={18} /> Filters
                </button>

                {/* Sidebar Filters - Desktop */}
                <aside className="hidden lg:block w-64 shrink-0 space-y-8">
                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                        <div className="space-y-2">
                            {uniqueCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-200' : 'text-gray-600 hover:bg-white hover:text-blue-600'}`}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Types */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Product Type</h3>
                        <div className="space-y-2">
                            {uniqueTypes.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedType(t)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedType === t ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-200' : 'text-gray-600 hover:bg-white hover:text-blue-600'}`}
                                >
                                    {t.replace("-", " ").charAt(0).toUpperCase() + t.replace("-", " ").slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                        <div className="space-y-4">
                            <input 
                                type="range" 
                                min="0" 
                                max={Math.max(...products.map(p => p.price)) || 100000} 
                                value={priceRange[1]} 
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>৳0</span>
                                <span>৳{priceRange[1]}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleClearFilters}
                        className="w-full py-2 text-sm font-bold text-red-500 hover:underline transition-all text-center"
                    >
                        Clear all filters
                    </button>
                </aside>

                {/* Main Product Grid */}
                <main className="grow">
                    <AnimatePresence mode="popLayout">
                        {filteredAndSortedProducts.length > 0 ? (
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {filteredAndSortedProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300"
                            >
                                <div className="bg-gray-100 p-4 rounded-full mb-4">
                                    <Filter size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                <button 
                                    onClick={handleClearFilters}
                                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                >
                                    Reset Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 lg:hidden"
                        />
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-101 p-6 lg:hidden overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-10">
                                {/* Categories */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueCategories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Types */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Product Type</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueTypes.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setSelectedType(t)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {t.replace("-", " ")}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Max Price: ৳{priceRange[1]}</h3>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max={Math.max(...products.map(p => p.price)) || 100000} 
                                        value={priceRange[1]} 
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex gap-4">
                                    <button 
                                        onClick={handleClearFilters}
                                        className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                                    >
                                        Reset
                                    </button>
                                    <button 
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}