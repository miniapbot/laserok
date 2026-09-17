import { useEffect, useState } from "react";
import { isMaxApp, initMaxApp, getMaxUser, isDarkMode } from "@/services/maxBridge";

export function useMaxApp() {
  const [user, setUser] = useState<ReturnType<typeof getMaxUser>>(null);
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isMaxApp()) {
      initMaxApp();
      setUser(getMaxUser());
      setDark(isDarkMode());
      setReady(true);
    }
  }, []);

  return { user, dark, ready, isMax: isMaxApp() };
}

