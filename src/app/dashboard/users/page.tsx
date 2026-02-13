'use client';

import React, { useEffect, useState } from 'react';
import { Users, Mail, Shield, ShieldCheck, User, Search, MoreHorizontal } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchUsers = async (token: string) => {
    try {
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(fetchUsers);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateRole = async (userId: string, newRole: string) => {
    setUpdating(userId);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ userId, role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setUpdating(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">User Management</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Manage user permissions and access levels</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined At</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-2xl bg-linear-to-tr from-blue-500/10 to-purple-500/10 flex items-center justify-center text-blue-600 font-black border border-blue-500/5">
                        {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{user.name || 'Anonymous'}</p>
                        <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                          <Mail className="size-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'seller' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck className="size-3" /> : user.role === 'seller' ? <Shield className="size-3" /> : <User className="size-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 shadow-sm" disabled={updating === user.id}>
                          <MoreHorizontal className="size-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-48 p-2 rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                        <div className="p-2">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Change Role To</p>
                           <button onClick={() => handleUpdateRole(user.id, 'admin')} className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                             <ShieldCheck className="size-4 text-purple-500" /> Admin
                           </button>
                           <button onClick={() => handleUpdateRole(user.id, 'seller')} className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                             <Shield className="size-4 text-blue-500" /> Seller
                           </button>
                           <button onClick={() => handleUpdateRole(user.id, 'customer')} className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                             <User className="size-4 text-gray-400" /> Customer
                           </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-24">
             <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-gray-300" />
             </div>
             <p className="text-gray-500 font-bold">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
