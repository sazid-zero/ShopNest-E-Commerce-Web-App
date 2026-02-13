'use client';

import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async (token: string) => {
      try {
        const res = await fetch('/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(fetchCategories);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Category Management</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Organize and manage your product hierarchy</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-blue-500"
            />
          </div>
          <Button className="rounded-2xl bg-blue-600 font-black px-6 shadow-lg shadow-blue-500/20">
            <Plus className="size-4 mr-2" /> Add Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCategories.map((category) => {
          // @ts-ignore
          const IconComponent = LucideIcons[category.icon] || LucideIcons.Package;
          
          return (
            <div key={category.id} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                  <IconComponent className="size-7" />
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <MoreVertical className="size-5 text-gray-400" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">{category.name}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  ID: {category.id}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl font-bold text-gray-600 hover:bg-gray-50 flex-1">
                  <Edit2 className="size-3.5 mr-2" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl font-bold text-red-500 hover:bg-red-50">
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 mt-8">
           <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-8 text-gray-300" />
           </div>
           <p className="text-gray-500 font-bold">No categories match your search</p>
        </div>
      )}
    </div>
  );
}
