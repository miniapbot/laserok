import { useEffect, useState } from "react";
import {
  initPlatform,
  getUser,
  isDarkMode,
  platform,
  isMax,
  isTelegram,
} from "@/services/platformApi";

export function usePlatform() {
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initPlatform();
    setUser(getUser());
    setDark(isDarkMode());
    setReady(true);
  }, []);

  return { user, dark, ready, platform, isMax: isMax(), isTelegram: isTelegram() };
}
