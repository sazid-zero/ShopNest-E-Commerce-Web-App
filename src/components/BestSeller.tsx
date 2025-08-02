import { allProducts } from "@/lib/products";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function BestSelling() {
    const bestProducts = allProducts.filter((product) => product.type === "best-seller");
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate("/products?type=best-seller");
    };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {bestProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}