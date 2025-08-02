import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cart';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            { ...order, id: `order-${Date.now()}`, date: new Date() },
          ],
        })),
    }),
    {
      name: 'orders-storage',
    }
  )
);