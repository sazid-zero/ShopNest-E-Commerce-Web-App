"use client";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useCartStore, CartItem } from "@/lib/cart";

export default function CartSync() {
  const { cartItems, mergeCart } = useCartStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. Send local cart to server (Blind merge)
        const token = await user.getIdToken();
        const localItems = useCartStore.getState().cartItems.map(i => ({ productId: i.id, quantity: i.quantity }));
        
        if (localItems.length > 0) {
            await fetch('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items: localItems })
            });
        }

        // 2. Fetch merged cart from server
        const res = await fetch('/api/cart', {
             headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const serverItems = await res.json();
            // Transform to CartItem type if needed (assuming server returns full product details)
            // The API returns joined data: product_id, quantity, name, price, image_url
            const formattedItems: CartItem[] = serverItems.map((i: any) => ({
                id: i.product_id,
                name: i.name,
                price: parseFloat(i.price), // Ensure number
                description: "", // Missing from cart query, maybe optional
                title: i.name, // alias
                category: "",
                rating: { rate: 0, count: 0 },
                image: i.image_url,
                quantity: i.quantity
            }));
            
            mergeCart(formattedItems);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
