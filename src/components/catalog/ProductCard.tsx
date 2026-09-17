import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { haptic } from "@/services/platformApi";
import { formatPrice } from "@/helpers/format";
import type { Product } from "@/types/product";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const hasDiscount =
    product.oldPrice !== undefined && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.oldPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptic.success();
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.images[0] ?? "",
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow min-w-0"
    >
      <div className="aspect-square bg-gray-100 relative flex items-center justify-center overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-5xl">📦</span>
        )}

        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            −{discountPercent}%
          </span>
        )}

        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ет
          </span>
        )}
      </div>

      <div className="p-2 flex flex-col flex-1 gap-1.5 min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice!)}
              </span>
            )}
            <span className="text-base font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <Button
            type="button"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className="w-full !px-2 !py-1.5 !text-xs"
          >
            В корзину
          </Button>
        </div>
      </div>
    </Link>
  );
}