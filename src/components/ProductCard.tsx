'use client';
import { useCartStore } from "@/lib/cart";
import { useWishlistStore } from "@/lib/wishlist";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

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
    stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, cartItems, toggleItemSelection } = useCartStore();
    const { toggleWishlist, wishlistItems } = useWishlistStore();
    const router = useRouter();

    const isOutOfStock = product.stock <= 0;

    const getCartCount = () => {
        const item = cartItems.find((item) => item.id === product.id);
        return item ? item.quantity : 0;
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isOutOfStock) return;
        addToCart(product);
        toggleItemSelection(product.id);
        router.push('/cart');
    };

    return (
        <a href={`/product/${product.id}`} className="block">
            <div
                className={`min-w-[240px] bg-gray-50 rounded-md p-4 flex flex-col shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}
            >
            <div className="relative group mb-3">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-44 object-contain rounded"
                />
                
                {isOutOfStock ? (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                        Out of Stock
                    </span>
                ) : (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{product.discount}%
                    </span>
                )}

                {!isOutOfStock && (
                    <button
                        onClick={(e) => { e.preventDefault(); addToCart(product); }}
                        className="absolute bottom-0 left-0 right-0 h-8 w-full flex items-center justify-center bg-black/50 backdrop-blur-xs bg-opacity-0 group-hover:bg-opacity-90 text-white text-sm font-medium rounded transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-105">
                        <ShoppingCart size={16} className="mr-1" /> Add to Cart
                    </button>
                )}
                
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded">
                         <span className="text-red-700 font-black text-xs border-2 border-red-700 px-2 py-1 rounded rotate-[-15deg] shadow-sm">STOCK OUT</span>
                    </div>
                )}
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
                    disabled={isOutOfStock}
                    onClick={handleBuyNow}
                    className={`w-full px-3 py-2 text-xs font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:scale-105 focus:ring-blue-400'}`}>
                    <span className="inline-block align-middle">{isOutOfStock ? 'Stock Out' : 'Buy Now'}</span>
                </button>

                <div className="flex gap-2 items-center justify-center">
                    {!isOutOfStock && (
                        <button
                            onClick={(e) => { e.preventDefault(); addToCart(product); }}
                            className="bg-green-100 p-1 rounded-full shadow relative transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                        >
                            <ShoppingCart size={16} className="text-green-600" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1 rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                    )}

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
        </a>


    );
}
