import type { Product } from "@/types/product";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import SortSelect from "./SortSelect";

interface Props {
  products: Product[];
}

export default function CatalogFilters({ products }: Props) {
  return (
    <div className="space-y-3 mb-4">
      <SearchBar />
      <CategoryList products={products} />
      <div className="flex items-center justify-between gap-3">
        <SortSelect />
      </div>
    </div>
  );
}
