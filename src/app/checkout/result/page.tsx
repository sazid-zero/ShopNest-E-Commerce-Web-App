"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";

export default function CheckoutResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const status = searchParams.get("status");
  const [loading, setLoading] = useState(true);
  const { clearSelectedItems } = useCartStore(); // Or clearCart if we had it

  useEffect(() => {
    if (sessionId) {
      // Payment successful
      // Ideally verify session with backend, but for MVP we assume success if ID is present
      // Clear cart
      // We might want to clear only purchased items if we had partial checkout, 
      // but here we just assume the whole cart was bought or at least clear local state.
      // Actually, we should probably call an API to confirm order and clear DB cart.
      // For now:
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
