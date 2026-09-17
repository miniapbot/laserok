import { useCartStore, type CartItem as CartItemType } from "@/store/cartStore";
import { haptic } from "@/services/platformApi";
import { formatPrice } from "@/helpers/format";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const handleIncrement = () => {
    haptic.selection();
    incrementQuantity(item.id);
  };

  const handleDecrement = () => {
    haptic.selection();
    decrementQuantity(item.id);
  };

  const handleRemove = () => {
    haptic.medium();
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl">📦</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium text-slate-900 text-sm leading-tight line-clamp-2">
          {item.title}
        </div>
        <div className="text-slate-500 text-xs mt-1">
          {formatPrice(item.price)}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
            aria-label="меньшить"
          >
            −
          </button>
          <span className="text-sm font-medium w-6 text-center">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
            aria-label="величить"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="font-bold text-slate-900 text-sm">
          {formatPrice(item.price * item.quantity)}
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="text-slate-400 hover:text-red-500 text-lg"
          aria-label="далить"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
