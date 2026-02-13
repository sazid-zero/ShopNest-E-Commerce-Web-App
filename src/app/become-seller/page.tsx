'use client';

import React, { useState } from 'react';
import { Store, ShieldCheck, Rocket, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function BecomeSellerPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    shopName: '',
    shopDescription: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
       router.push('/login?redirect=/become-seller');
       return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/auth/become-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        // We'll redirect after a short delay or let them click
      } else {
        setError(data.error || "Failed to submit application");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-2xl shadow-blue-500/10 text-center">
          <div className="size-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Welcome aboard!</h1>
          <p className="text-gray-500 font-bold mb-10 leading-relaxed">
            Your shop <span className="text-blue-600">"{formData.shopName}"</span> is officially live. Start adding products and reaching millions of customers today.
          </p>
          <div className="space-y-4">
            <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-500/20"
            >
                Go to Vendor Dashboard
            </Button>
            <Link href="/" className="block text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
                Back to marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 pt-24 pb-48 lg:pt-32 lg:pb-64">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 size-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 size-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8">
            <Zap className="size-3" /> Start your business journey
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
            Sell to millions. <br />
            <span className="text-blue-500">Grow with ShopNest.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg lg:text-xl font-bold text-gray-400 leading-relaxed">
            Join the most vibrant marketplace in the region. We provide the tools, you provide the passion.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Benefits */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { icon: Globe, title: "Global Reach", desc: "Access customers across the country with our logistics network." },
                 { icon: Rocket, title: "Quick Setup", desc: "List your first product in minutes with our intuitive dashboard." },
                 { icon: ShieldCheck, title: "Secure Payments", desc: "Get paid on time, every time, with our encrypted escrow system." },
                 { icon: Store, title: "Brand Identity", desc: "Customize your shop page to reflect your unique brand style." }
               ].map((item, i) => (
                 <div key={i} className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                      <item.icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm font-bold text-gray-500 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 bg-white rounded-[40px] border border-gray-100 p-10 shadow-2xl shadow-gray-200/50">
               <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Create your Shop</h2>
               <p className="text-sm font-bold text-gray-400 mb-8">Just a few details to get you started</p>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Shop Name</label>
                    <Input 
                      placeholder="e.g. Urban Edge Fashion"
                      required
                      value={formData.shopName}
                      onChange={e => setFormData({...formData, shopName: e.target.value})}
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-blue-500 font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                    <Textarea 
                      placeholder="Tell us about what you sell..."
                      required
                      rows={4}
                      value={formData.shopDescription}
                      onChange={e => setFormData({...formData, shopDescription: e.target.value})}
                      className="rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-blue-500 font-bold resize-none py-4"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-red-500 text-sm font-bold">
                       {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-500/20 group"
                  >
                    {loading ? (
                      <div className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Launch My Shop 
                        <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-[10px] text-center font-bold text-gray-400 leading-relaxed px-4">
                    By clicking "Launch My Shop", you agree to ShopNest's Vendor Terms and Conditions.
                  </p>
               </form>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-24 text-center">
         <p className="text-sm font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Trusted by over 10,000 vendors</p>
         <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <Store className="size-10" />
            <Zap className="size-10" />
            <Rocket className="size-10" />
            <ShieldCheck className="size-10" />
         </div>
      </div>
    </div>
  );
}
