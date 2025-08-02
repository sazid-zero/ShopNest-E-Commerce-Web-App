import { useParams } from 'react-router-dom';
import { allProducts } from '@/lib/products'; // Your product data
import ProductCard from "@/components/ProductCard.tsx"; // Reusable card for similar items
import { useCartStore } from '@/lib/cart';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCartStore();
    const product = id ? allProducts.find(p => p.id === parseInt(id)) : undefined;

    if (!product) {
        return <div>Product not found</div>;
    }

    const similarItems = allProducts.filter(p => p.category === product.category && p.id !== product.id);

    return (
        <div className="bg-white rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6">
            {/* Product Info */}
            <div className="grid md:grid-cols-2 gap-8">
                <img src={product.image} alt={product.title} className="w-full rounded-lg shadow" />
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-indigo-600">${product.price}</p>
                    <button 
                        onClick={() => addToCart(product.id)}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <p className="text-gray-500">({product.reviews} reviews)</p>
            </div>

            {/* Similar Items */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Similar Items</h2>
                <div className="flex flex-wrap gap-6">
                    {similarItems.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;