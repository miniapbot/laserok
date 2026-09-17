import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrdersStore, type Order } from "@/store/ordersStore";
import { formatPrice } from "@/helpers/format";
import Button from "@/components/ui/Button";

export default function ThankYouPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const orders = useOrdersStore((s) => s.orders);
  const fetchOrders = useOrdersStore((s) => s.fetchOrders);
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    if (!orderId) return;
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      setOrder(found);
    } else {
      fetchOrders();
    }
  }, [orderId, orders, fetchOrders]);

  if (!order) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">❓</div>
        <div className="text-slate-500 mb-4">Заказ не найден</div>
        <Button type="button" onClick={() => navigate("/")}>
          В каталог
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 text-center">
      <div className="text-6xl mb-4">✅</div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Спасибо за заказ!
      </h1>

      <p className="text-slate-500 mb-6">
        Мы свяжемся с вами в ближайшее время для подтверждения.
      </p>

      <div className="bg-white rounded-2xl shadow-sm p-4 text-left space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">омер заказа</span>
          <span className="font-mono font-medium text-slate-900">
            {order.id}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">мя</span>
          <span className="text-slate-900">{order.customer.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Телефон</span>
          <span className="text-slate-900">{order.customer.phone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Товаров</span>
          <span className="text-slate-900">{order.items.length}</span>
        </div>
        <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-3">
          <span>того</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => navigate("/")}
        className="w-full py-3"
      >
        Вернуться в каталог
      </Button>
    </div>
  );
}
