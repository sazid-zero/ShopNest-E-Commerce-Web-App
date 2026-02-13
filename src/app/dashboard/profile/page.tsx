'use client';

import React from 'react';
import { User, Mail, Shield, ShieldCheck, MapPin, Phone, Edit2 } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-sm font-bold text-gray-400 mt-1">Manage your personal information and security</p>
        </div>
        <Button variant="outline" className="rounded-2xl border-gray-100 font-black px-6 shadow-sm">
          <Edit2 className="size-4 mr-2" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm text-center">
            <div className="size-32 rounded-[40px] bg-linear-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-5xl font-black mx-auto mb-6 shadow-2xl shadow-blue-500/20">
              {profile.name?.[0] || profile.email?.[0].toUpperCase()}
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{profile.name || 'Anonymous User'}</h2>
            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mt-4 ${
              profile.role === 'admin' ? 'bg-purple-100 text-purple-700' :
              profile.role === 'seller' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {profile.role === 'admin' ? <ShieldCheck className="size-3" /> : profile.role === 'seller' ? <Shield className="size-3" /> : <User className="size-3" />}
              {profile.role}
            </div>
          </div>
        </div>

        {/* Details and Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-3">
              <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <User className="size-4" />
              </div>
              Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</p>
                <div className="h-14 px-6 rounded-2xl bg-gray-50 flex items-center font-bold text-gray-900">
                  {profile.name || 'Not provided'}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</p>
                <div className="h-14 px-6 rounded-2xl bg-gray-50 flex items-center font-bold text-gray-900 gap-3">
                  <Mail className="size-4 text-gray-400" />
                  {profile.email}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</p>
                <div className="h-14 px-6 rounded-2xl bg-gray-50 flex items-center font-bold text-gray-400 gap-3 italic">
                  <Phone className="size-4 text-gray-400" />
                  No phone added
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Address</p>
                <div className="h-14 px-6 rounded-2xl bg-gray-50 flex items-center font-bold text-gray-400 gap-3 italic">
                  <MapPin className="size-4 text-gray-400" />
                  Default address not set
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-tr from-gray-900 to-gray-800 rounded-[40px] p-10 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="size-32" />
             </div>
             <div className="relative z-10">
               <h3 className="text-xl font-black tracking-tight mb-2">Security & Privacy</h3>
               <p className="text-gray-400 font-bold text-sm mb-8 leading-relaxed">
                  Your account is protected by industry-standard encryption and Firebase Authentication. Keep your credentials safe.
               </p>
               <Button className="rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-black px-8">
                  Change Password
               </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
