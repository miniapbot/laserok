import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { backButton } from "@/services/platformApi";

/**
 * правляет BackButton в MAX/Telegram в зависимости от маршрута.
 *  каталоге (/) — скрыта.
 * а любой другой странице — возвращает в каталог.
 */
export function useProductPageBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isCatalog = location.pathname === "/";

    if (isCatalog) {
      backButton.hide();
    } else {
      const handler = () => navigate("/");
      backButton.show();
      backButton.onClick(handler);
      return () => {
        backButton.offClick(handler);
      };
    }
  }, [location.pathname, navigate]);
}
