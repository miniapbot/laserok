import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore, useCartTotalPrice } from "@/store/cartStore";
import { useOrdersStore } from "@/store/ordersStore";
import { haptic } from "@/services/platformApi";
import { formatPrice } from "@/helpers/format";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartTotalPrice();
  const createOrder = useOrdersStore((s) => s.createOrder);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <div className="text-slate-500 mb-4">Корзина пуста</div>
        <Button type="button" onClick={() => navigate("/")}>
          В каталог
        </Button>
      </div>
    );
  }

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) next.phone = "Укажите телефон полностью";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    let res = "+7";
    if (digits.length > 1) res += " (" + digits.slice(1, 4);
    if (digits.length >= 5) res += ") " + digits.slice(4, 7);
    if (digits.length >= 8) res += "-" + digits.slice(7, 9);
    if (digits.length >= 10) res += "-" + digits.slice(9, 11);
    return res;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      haptic.error();
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      haptic.success();
      const order = await createOrder({
        customer: {
          name: name.trim(),
          phone,
          comment: comment.trim() || undefined,
        },
        items,
        total,
      });
      clearCart();
      navigate(`/thank-you/${order.id}`, { replace: true });
    } catch (err) {
      haptic.error();
      setSubmitError(
        err instanceof Error ? err.message : "Не удалось создать заказ"
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 text-slate-500 hover:text-slate-900 text-sm"
      >
        ← В каталог
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-4">
        Оформление заказа
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-4 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              errors.name ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.name && (
            <div className="text-red-500 text-xs mt-1">{errors.name}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              errors.phone ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.phone && (
            <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Комментарий
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Пожелания к заказу (необязательно)"
            rows={3}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex justify-between text-sm text-slate-600 mb-1">
            <span>Товаров:</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900">
            <span>того:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {submitError && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl">
            {submitError}
          </div>
        )}

        <div className="text-xs text-slate-500">
          Нажимая «Подтвердить заказ», вы соглашаетесь с условиями обработки
          персональных данных.
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full py-3 text-base"
        >
          {submitting ? "Отправляю…" : "Подтвердить заказ"}
        </Button>
      </form>
    </div>
  );
}
