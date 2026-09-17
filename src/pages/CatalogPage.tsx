import { useProducts } from "@/hooks/useProducts";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { ProductGrid, CatalogFilters } from "@/components/catalog";

export default function CatalogPage() {
  const { data: products, isLoading, isError, error } = useProducts();
  const filtered = useFilteredProducts(products);

  if (isLoading) {
    return (
      <div className="text-center py-16 text-slate-500 px-4">
        Загрузка товаров…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center py-16 text-red-500 px-4">
        Ошибка загрузки: {(error as Error).message}
      </div>
    );
  }
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 px-4">
        Товары не найдены
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <CatalogFilters products={products} />
      <div className="text-sm text-slate-500 mb-3">
        Найдено: {filtered.length}{" "}
        {filtered.length === 1
          ? "товар"
          : filtered.length < 5
          ? "товара"
          : "товаров"}
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
