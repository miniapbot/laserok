import { useEffect } from "react";
import { isMiniApp } from "@/services/platform";

export function useMaxViewport() {
  useEffect(() => {
    if (!isMiniApp()) return;
    window.scrollTo(0, 0);
  }, []);
}
