import { useCatalogStore, type SortOption } from "@/store/catalogStore";
import { haptic } from "@/services/platformApi";

const options: { value: SortOption; label: string }[] = [
  { value: "default", label: "о умолчанию" },
  { value: "price-asc", label: "Сначала дешёвые" },
  { value: "price-desc", label: "Сначала дорогие" },
  { value: "name-asc", label: "о названию" },
];

export default function SortSelect() {
  const sort = useCatalogStore((s) => s.sort);
  const setSort = useCatalogStore((s) => s.setSort);

  const handleChange = (value: SortOption) => {
    haptic.selection();
    setSort(value);
  };

  return (
    <select
      value={sort}
      onChange={(e) => handleChange(e.target.value as SortOption)}
      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
