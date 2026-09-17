import type { Product } from "@/types/product";
import { useCatalogStore } from "@/store/catalogStore";
import { haptic } from "@/services/platformApi";

interface Props {
  products: Product[];
}

export default function CategoryList({ products }: Props) {
  const category = useCatalogStore((s) => s.category);
  const setCategory = useCatalogStore((s) => s.setCategory);

  const categories = Array.from(
    new Set(products.filter((p) => p.active).map((p) => p.category))
  );

  const items: { value: string | null; label: string }[] = [
    { value: null, label: "се" },
    ...categories.map((c) => ({ value: c, label: c })),
  ];

  const handleClick = (value: string | null) => {
    haptic.selection();
    setCategory(value);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
      {items.map((item) => {
        const isActive = item.value === category;
        return (
          <button
            key={item.value ?? "all"}
            type="button"
            onClick={() => handleClick(item.value)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-sm font-medium transition-colors flex-shrink-0 ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
