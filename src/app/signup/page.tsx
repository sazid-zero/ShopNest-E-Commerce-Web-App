"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      
      // Sync user to DB
      const token = await result.user.getIdToken();
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to sync user data");

      router.push("/");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl ring-1 ring-black/5">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 mb-4">
            <img src="/img.png" alt="Logo" className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-sm font-bold text-gray-400 mt-1">Join the ShopNest community today</p>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-3 animate-shake">
            <div className="w-1 h-1 rounded-full bg-red-600" />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="name@example.com"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-wide hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-bold text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in instead</Link>
        </p>
      </div>
    </div>
  );
}
