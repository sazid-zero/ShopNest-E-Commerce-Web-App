'use client';

import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Plus, ExternalLink, Power, Layout, Trash2, Edit2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export default function BannersManagement() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async (token: string) => {
      try {
        const res = await fetch('/api/banners', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(fetchBanners);
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Banner Management</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Control homepage hero sections and promotions</p>
        </div>
        <Button className="rounded-2xl bg-blue-600 font-black px-6 shadow-lg shadow-blue-500/20">
          <Plus className="size-4 mr-2" /> Add New Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="aspect-21/9 relative overflow-hidden bg-gray-100 border-b border-gray-100">
              {banner.image_url ? (
                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon className="size-12" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                 <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${banner.is_active ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {banner.is_active ? 'Active' : 'Draft'}
                 </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">{banner.title}</h3>
                  <p className="text-sm font-bold text-gray-400 mt-0.5">{banner.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-gray-50">
                    <Edit2 className="size-4 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-red-50 text-red-500">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <ExternalLink className="size-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target URL</p>
                    <p className="text-xs font-bold text-gray-900">{banner.link_url}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Layout className="size-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Position</p>
                    <p className="text-xs font-bold text-gray-900">Slot {banner.position || '-'}</p>
                  </div>
                </div>

                <div className="ml-auto">
                   <Button variant="outline" size="sm" className="rounded-xl border-gray-100 font-bold text-xs h-10 px-4">
                      <Power className={`size-3.5 mr-2 ${banner.is_active ? 'text-green-500' : 'text-gray-400'}`} />
                      {banner.is_active ? 'Deactivate' : 'Activate'}
                   </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
