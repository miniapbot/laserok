import { useNavigate } from "react-router-dom";
import { useCartStore, useCartTotalPrice } from "@/store/cartStore";
import { useBackButton } from "@/hooks/useBackButton";
import { haptic } from "@/services/platformApi";
import { formatPrice } from "@/helpers/format";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const items = useCartStore((s) => s.items);
  const total = useCartTotalPrice();
  const navigate = useNavigate();

  useBackButton(isOpen, closeCart);

  if (!isOpen) return null;

  const handleClose = () => {
    haptic.light();
    closeCart();
  };

  const handleClear = () => {
    haptic.medium();
    clearCart();
  };

  const handleCheckout = () => {
    haptic.success();
    closeCart();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <aside className="relative h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">орзина</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"
            aria-label="акрыть"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-6xl mb-4">🛒</div>
              <div>орзина пуста</div>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-100 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">того:</span>
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              формить заказ
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="w-full text-slate-500 hover:text-red-500 text-sm py-2 transition-colors"
            >
              чистить корзину
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
