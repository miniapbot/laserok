import { useCartStore, useCartTotalCount } from "@/store/cartStore";
import { haptic } from "@/services/platformApi";

export default function CartButton() {
  const count = useCartTotalCount();
  const openCart = useCartStore((state) => state.openCart);

  const handleClick = () => {
    haptic.light();
    openCart();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
      aria-label="Открыть корзину"
    >
      <span className="text-2xl">🛒</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </button>
  );
}
