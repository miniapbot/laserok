import { create } from "zustand";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc";

interface CatalogStore {
  search: string;
  category: string | null;
  sort: SortOption;
  setSearch: (value: string) => void;
  setCategory: (value: string | null) => void;
  setSort: (value: SortOption) => void;
  reset: () => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  search: "",
  category: null,
  sort: "default",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ search: "", category: null, sort: "default" }),
}));
