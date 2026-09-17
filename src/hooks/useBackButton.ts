import { useEffect } from "react";
import { backButton } from "@/services/platformApi";

/**
 * оказывает кнопку «азад» в MAX/Telegram, пока condition === true.
 * ри нажатии вызывает onBack.
 */
export function useBackButton(condition: boolean, onBack: () => void) {
  useEffect(() => {
    if (condition) {
      backButton.show();
      backButton.onClick(onBack);
    } else {
      backButton.hide();
    }

    return () => {
      backButton.offClick(onBack);
    };
  }, [condition, onBack]);
}
