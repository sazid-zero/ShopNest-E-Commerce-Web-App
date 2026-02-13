'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  if (loading) return <div className="text-center p-10">Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <Link
          href="/dashboard/products/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={product.image} alt="" className="h-10 w-10 object-contain rounded mr-3 bg-gray-100" />
                    <span className="font-medium text-gray-800">{product.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">৳{product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10 ? 'bg-green-100 text-green-700' : 
                    product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/dashboard/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-800 inline-block">
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
