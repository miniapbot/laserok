import { useMemo } from "react";
import type { Product } from "@/types/product";
import { useCatalogStore } from "@/store/catalogStore";

export function useFilteredProducts(products: Product[] | undefined) {
  const search = useCatalogStore((s) => s.search);
  const category = useCatalogStore((s) => s.category);
  const sort = useCatalogStore((s) => s.sort);

  return useMemo(() => {
    if (!products) return [];

    let result = products.filter((p) => p.active);

    // Фильтр по категории
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Поиск по названию и SKU
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    // Сортировка
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name, "ru")
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, sort]);
}
