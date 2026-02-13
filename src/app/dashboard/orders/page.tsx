'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, ExternalLink, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function MyOrdersPage() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async (token: string) => {
      try {
        const res = await fetch('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.recentActivity) {
          setOrders(data.recentActivity);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(fetchOrders);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Purchase Orders</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Track and manage your recent shopping history</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input 
            placeholder="Search order ID..." 
            className="pl-10 h-11 w-64 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-blue-500 font-bold text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.length > 0 ? orders.map((order, i) => (
          <div key={i} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                  <Package className="size-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">{order.label}</h3>
                  <p className="text-xs font-bold text-gray-400 mt-0.5">
                    Placed on {new Date(order.time).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Amount</p>
                    <p className="text-lg font-black text-gray-900">{order.amount}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Status</p>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'delivered' ? <CheckCircle2 className="size-3" /> : 
                       order.status === 'pending' ? <Clock className="size-3" /> : <Truck className="size-3" />}
                      {order.status}
                    </div>
                 </div>
                 <button className="h-12 px-6 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-black text-xs transition-colors flex items-center gap-2">
                    View Invoice <ExternalLink className="size-3.5" />
                 </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 mt-8">
             <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="size-8 text-gray-300" />
             </div>
             <p className="text-gray-500 font-bold">You haven't placed any orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
