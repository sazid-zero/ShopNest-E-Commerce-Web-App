import {Star, ShoppingCart, Heart} from "lucide-react"
import {useState} from "react";
import {allProducts} from "@/lib/products";
import {useNavigate} from "react-router-dom";


export default function BestSelling() {

    const bestProducts = allProducts.filter((product) => product.type === "best-seller");

    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate("/products?type=best-seller");
    };

    const [cartCount, setCartCount] = useState<Record<number, number>>({})
    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({})
    const addToCart = (id: number) => {
        setCartCount((prev: Record<number, number>) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }))
    }

    const toggleWishlist = (id: number) => {
        setWishlistItems((prev: Record<number, boolean>) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <section className="py-10 px-6 sm:px-10 bg-white">
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {bestProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-50 rounded-lg shadow-xl p-4 flex flex-col hover:shadow-2xl transition-all"
                    >
                        <div className="relative mb-3">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-44 object-contain rounded"
                            />
                            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -{product.discount}%
              </span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h4>
                        <div className="text-blue-600 text-lg font-bold">${product.price}</div>
                        <div className="text-xs text-gray-500 line-through">${product.original}</div>
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

                                    {cartCount[product.id] > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1 rounded-full">
                                    {cartCount[product.id]}
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
        </section>
    )
}