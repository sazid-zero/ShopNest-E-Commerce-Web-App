'use client';
import {
    Smartphone,
    Laptop,
    Headphones,
    Camera,
    Gamepad2,
    Tv,
    Watch,
    Printer,
    Drone,
    House,
    ShoppingBag,
    MonitorSmartphone,
} from "lucide-react"
import { useRouter } from "next/navigation";

import * as Icons from "lucide-react";
import { useState, useEffect } from "react";

export default function CategoryGrid() {
    const [categories, setCategories] = useState<{ name: string; icon: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            });
    }, []);

    const router = useRouter();

    if (loading) return <div className="p-10 text-center">Loading Categories...</div>;


    const handleCategoryClick = (categoryName: string) => {
        router.push(`/products?category=${encodeURIComponent(categoryName)}`);
    };



    return (
        <section className="py-10 px-6 sm:px-10 bg-white">
            <span className="flex gap-1 items-center mb-12">
          <img src="/bar3.png" alt="bar" className="h-7 w-10" />
          <p className="text-gray-900 font-bold text-2xl ">Featured Category</p>
        </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map(({ name, icon }, idx) => {
                    const Icon = (Icons as any)[icon] || Icons.HelpCircle;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleCategoryClick(name)}
                            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-blue-100 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] rounded-lg p-4 transition-all group"
                        >
                            <Icon className="text-blue-600 h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                {name}
                            </span>
                        </button>
                    );
                })}

            </div>
        </section>
    )
}