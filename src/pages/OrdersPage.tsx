import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrdersStore, type Order } from "@/store/ordersStore";
import { useCartStore } from "@/store/cartStore";
import { haptic } from "@/services/platformApi";
import { formatPrice } from "@/helpers/format";
import Button from "@/components/ui/Button";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const statusLabel: Record<Order["status"], { text: string; className: string }> = {
  new: { text: "Новый", className: "bg-blue-100 text-blue-700" },
  processing: { text: "В обработке", className: "bg-yellow-100 text-yellow-700" },
  done: { text: "Выполнен", className: "bg-green-100 text-green-700" },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  const status = statusLabel[order.status] ?? statusLabel.new;

  const handleRepeat = () => {
    haptic.success();
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
        });
      }
    });
    openCart();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-xs text-slate-500 truncate">
            {order.id}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {formatDate(order.createdAt)}
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${status.className}`}
        >
          {status.text}
        </span>
      </div>

      <div className="space-y-2">
        {(expanded ? order.items : order.items.slice(0, 2)).map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl">📦</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-slate-900 truncate">
                {item.title}
              </div>
              <div className="text-xs text-slate-500">
                {item.quantity} × {formatPrice(item.price)}
              </div>
            </div>
            <div className="text-sm font-medium text-slate-900 whitespace-nowrap">
              {formatPrice(item.quantity * item.price)}
            </div>
          </div>
        ))}

        {!expanded && order.items.length > 2 && (
          <button
            type="button"
            onClick={() => {
              haptic.selection();
              setExpanded(true);
            }}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Ещё {order.items.length - 2} товар(ов) →
          </button>
        )}

        {expanded && order.items.length > 2 && (
          <button
            type="button"
            onClick={() => {
              haptic.selection();
              setExpanded(false);
            }}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            ← Свернуть
          </button>
        )}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
        <span className="text-sm text-slate-500">того:</span>
        <span className="text-lg font-bold text-slate-900">
          {formatPrice(order.total)}
        </span>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleRepeat}
          className="flex-1 py-2 text-sm"
        >
          Повторить заказ
        </Button>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const orders = useOrdersStore((s) => s.orders);
  const isLoading = useOrdersStore((s) => s.isLoading);
  const error = useOrdersStore((s) => s.error);
  const fetchOrders = useOrdersStore((s) => s.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading && orders.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 px-4">
        Загрузка заказов…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500 px-4">
        Ошибка: {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">📋</div>
        <div className="text-slate-500 mb-4">У вас ещё нет заказов</div>
        <Button type="button" onClick={() => navigate("/")}>
          В каталог
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 text-slate-500 hover:text-slate-900 text-sm"
      >
        ← В каталог
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-4">Мои заказы</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
