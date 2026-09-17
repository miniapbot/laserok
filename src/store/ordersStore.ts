import { create } from "zustand";
import type { CartItem } from "./cartStore";

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    comment?: string;
  };
  items: CartItem[];
  total: number;
  status: "new" | "processing" | "done";
}

interface OrdersStore {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (data: {
    customer: Order["customer"];
    items: CartItem[];
    total: number;
  }) => Promise<Order>;
  getOrder: (id: string) => Order | undefined;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const orders = await res.json();
      set({ orders, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        isLoading: false,
      });
    }
  },

  createOrder: async ({ customer, items, total }) => {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer, items, total }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create order: ${res.status}`);
    }

    const order = await res.json();
    set((state) => ({ orders: [order, ...state.orders] }));
    return order;
  },

  getOrder: (id) => get().orders.find((o) => o.id === id),
}));
