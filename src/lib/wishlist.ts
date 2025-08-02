import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlistItems: number[];
  toggleWishlist: (productId: number) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlistItems: [],
      toggleWishlist: (productId) =>
        set((state) => {
          const existingItem = state.wishlistItems.find((item) => item === productId);
          if (existingItem) {
            return {
              wishlistItems: state.wishlistItems.filter((item) => item !== productId),
            };
          }
          return { wishlistItems: [...state.wishlistItems, productId] };
        }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);