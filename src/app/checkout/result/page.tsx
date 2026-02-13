"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";

export const dynamic = 'force-dynamic';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const status = searchParams.get("status");
  const [loading, setLoading] = useState(true);
  const { clearSelectedItems } = useCartStore(); 

  useEffect(() => {
    if (sessionId) {
      setLoading(false);
    } else if (status === 'cancel') {
        setLoading(false);
    } else {
         setLoading(false);
    }
  }, [sessionId, status]);

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (sessionId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received.</p>
          <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 text-6xl mb-4">✕</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">You cancelled the payment. No charges were made.</p>
        <Link href="/cart" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition">
          Return to Cart
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
