import { useWishlistStore } from "@/lib/wishlist";
import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
    const { wishlistItems } = useWishlistStore();
    const products = allProducts.filter((product) => wishlistItems.includes(product.id));

    return (
        <div className="bg-white rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Your wishlist is empty.</p>
            )}
        </div>
    );
}