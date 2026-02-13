import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { allProducts } from './products';
import type { Product } from "@/components/ProductCard";
import { auth } from './firebase';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  selectedItems: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  toggleItemSelection: (productId: number) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  clearSelectedItems: () => void;
  mergeCart: (items: CartItem[]) => void;
}

const syncItem = async (productId: number, quantity: number) => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const token = await user.getIdToken();
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
  } catch (error) {
    console.error("Failed to sync cart item", error);
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedItems: [],
      addToCart: (product) => {
        set((state) => {
          let newItems = state.cartItems;
          const productId = product.id;
          const existingItem = state.cartItems.find((item) => item.id === productId);
          
          if (existingItem) {
            newItems = state.cartItems.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
             newItems = [...state.cartItems, { ...product, quantity: 1 }];
          }
          
          // Sync
          const finalItem = newItems.find(i => i.id === productId);
          if (finalItem) syncItem(productId, finalItem.quantity);

          return { cartItems: newItems };
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
           syncItem(productId, 0); // 0 means remove in API logic
           return { cartItems: state.cartItems.filter((item) => item.id !== productId) };
        });
      },
      updateQuantity: (productId, delta) => {
        set((state) => {
          const newItems = state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
          );
          const finalItem = newItems.find(i => i.id === productId);
          if (finalItem) syncItem(productId, finalItem.quantity);
          
          return { cartItems: newItems };
        });
      },
      toggleItemSelection: (productId) =>
        set((state) => ({
          selectedItems: state.selectedItems.includes(productId)
            ? state.selectedItems.filter((id) => id !== productId)
            : [...state.selectedItems, productId],
        })),
      selectAllItems: () =>
        set((state) => ({ selectedItems: state.cartItems.map((item) => item.id) })),
      deselectAllItems: () => set({ selectedItems: [] }),
      clearSelectedItems: () =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => !state.selectedItems.includes(item.id)), // Should we sync deletions? Yes, complex though.
          selectedItems: [],
        })),
      mergeCart: (items) => set({ cartItems: items }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
