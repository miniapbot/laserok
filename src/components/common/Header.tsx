import { Link } from "react-router-dom";
import { CartButton } from "@/components/cart";
import { usePlatform } from "@/hooks/usePlatform";
import { haptic } from "@/services/platformApi";

export default function Header() {
  const { user, isMax, isTelegram } = usePlatform();
  const inMiniApp = isMax || isTelegram;

  const greeting =
    inMiniApp && user?.first_name
      ? `ривет, ${user.first_name}!`
      : "LaserOK";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 w-full">
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 truncate hover:text-blue-700 transition-colors"
        >
          {greeting}
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/contacts"
            onClick={() => haptic.light()}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-2xl"
            aria-label="Контакты"
          >
            📞
          </Link>
          <Link
            to="/orders"
            onClick={() => haptic.light()}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-2xl"
            aria-label="Мои заказы"
          >
            📋
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
