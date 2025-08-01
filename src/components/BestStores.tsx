import {Tag} from "lucide-react";

const stores = [
    {
        name: "Staples",
        logo: "/logos/Staples.png",
        cover: "/covers/staples.jpg",
        categories: "Bag . Perfume",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "Bevmo",
        logo: "/logos/Bevmo.png",
        cover: "/covers/Bevmo.jpg",
        categories: "Cosmetics . Skincare",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "Quicklly",
        logo: "/logos/Quicklly.png",
        cover: "/covers/Quicklly.jpg",
        categories: "Shoes . Fashion",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "Now Delivery",
        logo: "/logos/NowDelivery.png",
        cover: "/covers/NowDelivery.jpg",
        categories: "Phone . Earbuds",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "GlowMart",
        logo: "/logos/GlowMart.png",
        cover: "/covers/GlowMart.jpg",
        categories: "Skincare . Wellness",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "UrbanMart",
        logo: "/logos/UrbanMart.png",
        cover: "/covers/UrbanMart.jpg",
        categories: "Fashion . Accessories",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "TechHive",
        logo: "/logos/TechHive.png",
        cover: "/covers/TechHive.jpg",
        categories: "Laptops, Accessories",
        delivery: "Delivery in 24 Hours",
    },
    {
        name: "StyleNest",
        logo: "/logos/StyleNest.png",
        cover: "/covers/StyleNest.jpg",
        categories: "Fashion, Footwear",
        delivery: "Delivery in 24 Hours",
    }
]
export default function BestSellingStores() {

    return (
        <section className="py-10 px-6 sm:px-10 bg-white">
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
                {stores.map((store, index) => (
                    <div key={index} className="relative bg-gray-50 rounded-xl shadow-2xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden">
                        {/* Cover Image */}
                        <img
                            src={store.cover}
                            alt={`${store.name} cover`}
                            className="w-full h-60 object-cover rounded-xl"
                        />

                        {/* Logo - overlapping circle */}
                        <div className="absolute top-50 left-1/2 transform -translate-x-1/2">
                            <img
                                src={store.logo}
                                alt={`${store.name} logo`}
                                className="w-20 h-20 rounded-full border-4 border-white shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                            />
                        </div>

                        {/* Store Info */}
                        <div className="pt-12 pb-4 px-4 text-center">
                            <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                            <p className="text-xs font-semibold text-gray-500 mt-1">{store.categories}</p>
                            <span className="flex items-center justify-center mt-2 gap-1">
                                <Tag className="text-blue-500 h-4 w-4 mt-1"/>
                                <p className="text-xs font-semibold text-blue-500">{store.delivery}</p>
                            </span>

                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}