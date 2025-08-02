import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allProducts } from './products';
import type { Product } from "@/components/ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  selectedItems: number[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  toggleItemSelection: (productId: number) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  clearSelectedItems: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      selectedItems: [],
      addToCart: (productId) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === productId);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          const product = allProducts.find((p) => p.id === productId);
          if (product) {
            return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
          }
          return state;
        }),
      removeFromCart: (productId) =>
        set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== productId) })),
      updateQuantity: (productId, delta) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
          ),
        })),
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
          cartItems: state.cartItems.filter((item) => !state.selectedItems.includes(item.id)),
          selectedItems: [],
        })),
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
