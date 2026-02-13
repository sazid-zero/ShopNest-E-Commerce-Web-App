'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Store, Image, List, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import DashboardGuard from '@/components/DashboardGuard';

const sidebarItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'seller', 'customer'] },
  { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag, roles: ['seller', 'customer'] }, // Sellers see shop orders, customers see purchase orders
  { name: 'Products', href: '/dashboard/products', icon: ShoppingBag, roles: ['admin', 'seller'] },
  { name: 'Shops', href: '/dashboard/shops', icon: Store, roles: ['admin'] },
  { name: 'Categories', href: '/dashboard/categories', icon: List, roles: ['admin'] },
  { name: 'Banners', href: '/dashboard/banners', icon: Image, roles: ['admin'] },
  { name: 'Users', href: '/dashboard/users', icon: Users, roles: ['admin'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const filteredItems = sidebarItems.filter(item => 
    profile && item.roles.includes(profile.role)
  );
  
  return (
    <DashboardGuard allowedRoles={['admin', 'seller', 'customer']}>
      <div className="flex min-h-screen bg-gray-50/50 pt-16">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Menu Toggle (Only visible on mobile) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed left-4 top-20 z-30 p-2 bg-white rounded-lg shadow-md lg:hidden"
          >
            <LayoutDashboard className="h-6 w-6 text-gray-700" />
          </button>
        )}

        {/* Sidebar */}
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-8 relative">
            {/* Close Button (Mobile) */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <LogOut className="h-5 w-5 rotate-180" /> {/* Reusing LogOut icon as back/close temporarily if X not imported, or add X import */}
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">SN</div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">ShopNest <span className="text-blue-600">Dash</span></h1>
            </div>
            {profile && (
              <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Authenticated as</p>
                <p className="text-sm font-black text-gray-900 truncate">{profile.name || 'Admin User'}</p>
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider mt-1">
                  {profile.role}
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 px-4 overflow-y-auto">
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (mobile)
                  className={`flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all group ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${
                    pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                  }`} />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-4 mt-auto border-t border-gray-100">
            <button 
              onClick={logout}
              className="flex items-center w-full px-4 py-4 text-sm font-bold text-red-500 rounded-2xl hover:bg-red-50 transition-all group"
            >
              <LogOut className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 transition-all duration-300">
          <div className="min-h-screen p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </DashboardGuard>
  );
}
