'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [categories, setCategories] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '0',
    description: '',
    category_id: '',
    type: 'new-arrival'
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/shops').then(res => res.json()),
      fetch(`/api/products/${id}`).then(res => res.json())
    ]).then(([cats, shps, prod]) => {
      setCategories(cats);
      setShops(shps);
      setFormData({
        name: prod.title,
        price: prod.price.toString(),
        stock: prod.stock.toString(),
        description: prod.description || '',
        category_id: prod.category_id || '',
        type: prod.type || 'new-arrival'
      });
      setFetching(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/dashboard/products');
      }
    } catch (error) {
      console.error('Failed to update product', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center p-10">Loading product data...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit Product: {formData.name}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Product Name</label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Type / Tag</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="new-arrival">New Arrival</option>
                <option value="flash-sale">Flash Sale</option>
                <option value="best-seller">Best Seller</option>
                <option value="featured">Featured</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <select
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Price (৳)</label>
              <input
                required
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Stock Quantity</label>
              <input
                required
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              disabled={loading}
              type="submit"
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 shadow-lg shadow-blue-200"
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
