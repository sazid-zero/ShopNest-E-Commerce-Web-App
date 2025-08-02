import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/lib/products";

export default function Products() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    const filteredProducts = allProducts.filter((product) => {
        const matchesType = type ? product.type === type : true;
        const matchesCategory = category ? product.category === category : true;
        return matchesType && matchesCategory;
    });

    const heading = () => {
        if (type && category) {
            return `${type.replace("-", " ").toUpperCase()} • ${category.toUpperCase()}`;
        }
        if (type) {
            return `${type.replace("-", " ").toUpperCase()}`;
        }
        if (category) {
            return `${category.toUpperCase()}`;
        }
        return "All Products";
    };

    return (
        <div className="bg-white min-h-screen rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{heading()}</h2>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-12">No products found for this filter.</p>
            )}
        </div>
    );
}