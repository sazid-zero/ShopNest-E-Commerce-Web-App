import {Tag} from "lucide-react";

import { useState, useEffect } from "react";

export default function BestSellingStores() {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/shops")
            .then(res => res.json())
            .then(data => {
                setShops(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="py-10 text-center">Loading Stores...</div>;


    return (
        <section className="py-10 px-6 sm:px-10 ">
            {/* Cashback Banner */}

                <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                    <img src="/cashback.png" alt="Cashback Banner" className="rounded-sm"/>
            </div>

            {/* Best Selling Stores */}
            <span className="flex gap-1 items-center mb-6">
            <img src="/bar.png" alt="bar" className="h-7 w-10" />
                <p className="text-blue-600 font-bold text-2xl"> Best Selling Stores </p>
            </span>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:gap-8 gap-2">
                {shops.map((store, index) => (
                    <a 
                        key={index} 
                        href={`/shops/${store.id}`}
                        className="relative bg-gray-50 rounded-xl shadow-2xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer no-underline block"
                    >
                        {/* Cover Image */}
                        <img
                            src={store.cover_url || "/covers/staples.jpg"}
                            alt={`${store.name} cover`}
                            className="w-full h-60 object-cover rounded-xl"
                        />

                        {/* Logo - overlapping circle */}
                        <div className="absolute top-50 left-1/2 transform -translate-x-1/2">
                            <img
                                src={store.logo_url}
                                alt={`${store.name} logo`}
                                className="w-20 h-20 rounded-full border-4 border-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                            />
                        </div>

                        {/* Store Info */}
                        <div className="pt-12 pb-4 px-4 text-center">
                            <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                            <p className="text-xs font-semibold text-gray-500 mt-1 line-clamp-1">{store.description}</p>
                            <span className="flex items-center justify-center mt-2 gap-1">
                                <Tag className="text-blue-500 h-4 w-4 mt-1"/>
                                <p className="text-xs font-semibold text-blue-500">Official Store</p>
                            </span>
                        </div>
                    </a>
                ))}
            </div>


        </section>
    )
}