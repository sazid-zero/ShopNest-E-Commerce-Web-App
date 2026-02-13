'use client';

import { ShoppingCart, Package, Store, TrendingUp, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/providers/AuthProvider';

const iconMap: any = {
  ShoppingCart,
  Package,
  Store,
  TrendingUp,
};

export default function DashboardOverview() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const res = await fetch('/api/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.stats) {
            setStats(data.stats);
            setRecentActivity(data.recentActivity || []);
          }
        } catch (error) {
          console.error("Failed to fetch dashboard stats:", error);
        } finally {
          setLoading(false);
        }
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {profile?.role === 'admin' ? 'Administrative Overview' : 
             profile?.role === 'seller' ? 'Vendor Terminal' : 'My Dashboard'}
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1">
            Welcome back, {profile?.name || 'User'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] || Package;
          return (
            <div key={stat.name} className="relative group overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <Icon className="h-16 w-16" />
              </div>
              <div className="flex items-center relative z-10">
                <div className={`${stat.color} p-3.5 rounded-2xl text-white mr-4 shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider">{stat.name}</p>
                  <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Activity</h2>
          <button className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest px-4 py-2 bg-blue-50 rounded-full transition-colors">View All</button>
        </div>
        
        <div className="space-y-6">
          {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
            <div key={i} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center mr-4 group-hover:bg-white transition-colors shadow-sm">
                   <ShoppingCart className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900">{activity.label}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs font-bold text-gray-400">
                      {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(activity.time).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-gray-900">{activity.amount}</p>
                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mt-1 ${
                  activity.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                  activity.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          )) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-400 font-bold">No recent activity found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
