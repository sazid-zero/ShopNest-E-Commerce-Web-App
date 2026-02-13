'use client';

import React, { useEffect, useState } from 'react';
import { Store, User, ExternalLink, MoreVertical, Trash2, Edit } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ShopsManagement() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async (token: string) => {
      try {
        const res = await fetch('/api/shops', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setShops(data);
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(fetchShops);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Shop Management</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Manage and monitor all registered vendors</p>
        </div>
        <Button className="rounded-2xl bg-blue-600 font-black px-6 shadow-lg shadow-blue-500/20">
          Register New Shop
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden bg-gray-100">
              {shop.cover_url ? (
                <img src={shop.cover_url} alt={shop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Store className="size-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-6 relative">
              <div className="absolute -top-10 left-6">
                <div className="size-16 rounded-2xl bg-white p-1 border border-gray-100 shadow-xl">
                  {shop.logo_url ? (
                    <img src={shop.logo_url} alt={shop.name} className="w-full h-full object-contain rounded-xl" />
                  ) : (
                    <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">
                      {shop.name[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mb-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                      <MoreVertical className="size-5 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-48 p-2 rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                    <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                      <Edit className="size-4" /> Edit Shop
                    </button>
                    <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="size-4" /> Delete Shop
                    </button>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mt-2">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">{shop.name}</h3>
                <p className="text-xs font-bold text-gray-400 line-clamp-2 mt-1 min-h-[32px]">{shop.description}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <User className="size-3" />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {shop.id.slice(0, 8)}</span>
                </div>
                <a 
                  href={`/shops/${shop.id}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:gap-2 transition-all"
                >
                  Visit Shop <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
