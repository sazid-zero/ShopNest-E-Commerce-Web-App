import { useCartStore } from "@/lib/cart";
import { useWishlistStore } from "@/lib/wishlist";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    original: number;
    discount: number;
    rating: number;
    reviews: number;
    type: string;
    category: string;
    description: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, cartItems, toggleItemSelection } = useCartStore();
    const { toggleWishlist, wishlistItems } = useWishlistStore();
    const navigate = useNavigate();

    const getCartCount = () => {
        const item = cartItems.find((item) => item.id === product.id);
        return item ? item.quantity : 0;
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product.id);
        toggleItemSelection(product.id);
        navigate('/cart');
    };

    return (
        <Link to={`/product/${product.id}`} className="block">
            <div
                className="sm:min-w-[240px] bg-gray-50 rounded-md p-4 flex flex-col shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
            >
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
                    onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                    className="absolute bottom-0 left-0 right-0 h-8 w-full flex items-center justify-center bg-black/50 backdrop-blur-xs bg-opacity-0 group-hover:bg-opacity-90 text-white text-sm font-medium rounded transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-105">
                    <ShoppingCart size={16} className="mr-1" /> Add to Cart
                </button>
            </div>

            <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h4>
            <div className="text-blue-600 text-lg font-bold">৳{product.price}</div>
            <div className="text-xs text-gray-500 line-through">৳{product.original}</div>

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
                <button 
                    onClick={handleBuyNow}
                    className="w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                    <span className="inline-block align-middle">Buy Now</span>
                </button>

                <div className="flex gap-2 items-center justify-center">
                    <button
                        onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                        className="bg-green-100 p-1 rounded-full shadow relative transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                    >
                        <ShoppingCart size={16} className="text-green-600" />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1 rounded-full">
                                {getCartCount()}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                        className="bg-red-100 p-1 rounded-full shadow transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                    >
                        <Heart
                            size={16}
                            className={wishlistItems.includes(product.id) ? "text-red-400 fill-red-400" : "text-red-400"}
                        />
                    </button>
                </div>
            </div>
            </div>
        </Link>
    );
}
