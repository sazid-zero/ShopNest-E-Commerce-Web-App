import { useEffect, useState } from "react"
import {Star, ShoppingCart, Heart} from "lucide-react"

const products = [
    {
        id: 1,
        image: "/flash/hv-g92.webp",
        title: "HAVIT HV-G92 Gamepad",
        price: 1200,
        original: 1600,
        discount: 40,
        rating: 4.5,
        reviews: 88
    },
    {
        id: 2,
        image: "/flash/ak-900.jpg",
        title: "AK-900 Wired Keyboard",
        price: 960,
        original: 1160,
        discount: 35,
        rating: 4.0,
        reviews: 75
    },
    {
        id: 3,
        image: "/flash/monitor.webp",
        title: "IPS LCD Gaming Monitor",
        price: 37000,
        original: 40000,
        discount: 30,
        rating: 4.8,
        reviews: 99
    },
    {
        id: 4,
        image: "/flash/mouse.webp",
        title: "Ergonomic Gaming Mouse",
        price: 750,
        original: 850,
        discount: 25,
        rating: 4.3,
        reviews: 54
    },

    {
        id: 5,
        image: "/flash/headset.jpg",
        title: "Noise-Cancelling Headset",
        price: 1400,
        original: 2000,
        discount: 30,
        rating: 4.6,
        reviews: 62
    },
    {
        id: 6,
        image: "/flash/chair.webp",
        title: "S-Series Comfort Chair",
        price: 3750,
        original: 3900,
        discount: 25,
        rating: 4.7,
        reviews: 82
    },
    {
        id: 7,
        image: "/flash/laptop.webp",
        title: "HP 14s-dq3139TU Intel Celeron N4500 14\" FHD Laptop",
        price: 39500,
        original: 42000,
        discount: 15,
        rating: 4.4,
        reviews: 68
    },
    {
        id: 8,
        image: "/flash/tablet.webp",
        title: "HONOR Pad X8a 4GB RAM 128GB Storage 11\" Tablet",
        price: 19900,
        original: 21000,
        discount: 30,
        rating: 4.0,
        reviews: 37
    },
    {
        id: 9,
        image: "/flash/usbhub.webp",
        title: "USB 3.0 4-in-1 Hub",
        price: 700,
        original: 800,
        discount: 33,
        rating: 4.1,
        reviews: 29
    },
    {
        id: 10,
        image: "/flash/powerbank.webp",
        title: "Hoco J89 10000mAh 20W Fast Charging Digital Display Power Bank",
        price: 1090,
        original: 1310,
        discount: 30,
        rating: 4.3,
        reviews: 41
    }
]


export default function FlashSale() {
    const [timeLeft] = useState({
        days: "03",
        hours: "23",
        minutes: "19",
        seconds: "56"
    })

    useEffect(() => {
        // Add countdown timer logic here later
    }, [])

    const [cartCounts, setCartCounts] = useState<Record<number, number>>({})
    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({})
    const addToCart = (id: number) => {
        setCartCounts((prev: Record<number, number>) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }))
    }

    const toggleWishlist = (id: number) => {
        setWishlistItems((prev: Record<number, boolean>) => ({ ...prev, [id]: !prev[id] }))
    }


    return (
        <div className="bg-white rounded-t-3xl mt-6 mx-auto p-6">
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
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[240px] bg-gray-50 rounded-md p-4 flex flex-col shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                    >
                        {/* Product Image with Hover Button */}
                        <div className="relative group mb-3">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-44 object-contain rounded"
                            />
                            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -{product.discount}%
              </span>
                            <button
                                onClick={() => addToCart(product.id)}
                                className="absolute bottom-0 left-0 right-0 h-8 w-full flex items-center justify-center bg-black/50 backdrop-blur-xs bg-opacity-0 group-hover:bg-opacity-90 text-white text-sm font-medium rounded transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-105">
                                <ShoppingCart size={16} className="mr-1"/> Add to Cart
                            </button>
                        </div>

                        {/* Product Info */}
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h4>
                        <div className="text-blue-600 text-lg font-bold">${product.price}</div>
                        <div className="text-xs text-gray-500 line-through">${product.original}</div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={
                                        i + 1 <= Math.floor(product.rating)
                                            ? "currentColor"
                                            : i < product.rating
                                                ? "currentColor"
                                                : "none"
                                    }
                                    stroke="currentColor"
                                />
                            ))}
                            <span className="text-gray-600 text-xs">({product.reviews})</span>

                        </div>
                        <div className=" mt-3 flex gap-2 items-center justify-center">
                            <button className="w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                                <span className="inline-block align-middle">Buy Now</span>
                            </button>

                            <div className="flex gap-2 items-center justify-center">
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="bg-green-100 p-1 rounded-full shadow relative transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                                >
                                    <ShoppingCart size={16} className="text-green-600" />

                                    {cartCounts[product.id] > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1 rounded-full">
                                    {cartCounts[product.id]}
                                     </span>
                                    )}
                                </button>


                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="bg-red-100 p-1 rounded-full shadow transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                                >
                                    <Heart
                                        size={16}
                                        className={wishlistItems[product.id] ? "text-red-400 fill-red-400" : "text-red-400"}
                                    />
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-6">
                <button className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 duration-200 text-white rounded-full shadow-lg hover:scale-105 transition-all hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                    <span className="inline-block align-middle">View All Products</span>
                </button>
            </div>
        </div>
    )
}