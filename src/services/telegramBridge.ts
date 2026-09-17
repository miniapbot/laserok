/**
 * бёртка над Telegram WebApp SDK.
 * езопасна: если приложение запущено вне Telegram,
 * все методы просто ничего не делают.
 */

const getTg = () => {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
};

export const isTelegramApp = (): boolean => {
  return !!getTg()?.initData;
};

export const initTelegramApp = (): void => {
  const tg = getTg();
  if (!tg) {
    console.warn("[Telegram Bridge] риложение запущено вне Telegram.");
    return;
  }
  tg.ready();
  tg.expand();
};

export const getTelegramUser = () => {
  return getTg()?.initDataUnsafe?.user ?? null;
};

export const getTelegramInitData = (): string => {
  return getTg()?.initData ?? "";
};

export const getTelegramPlatform = (): string => {
  return getTg()?.platform ?? "web";
};

export const isTelegramDarkMode = (): boolean => {
  return getTg()?.colorScheme === "dark";
};

export const telegramHaptic = {
  light: () => getTg()?.HapticFeedback.impactOccurred("light"),
  medium: () => getTg()?.HapticFeedback.impactOccurred("medium"),
  success: () => getTg()?.HapticFeedback.notificationOccurred("success"),
  error: () => getTg()?.HapticFeedback.notificationOccurred("error"),
  selection: () => getTg()?.HapticFeedback.selectionChanged(),
};

export const telegramBackButton = {
  show: () => getTg()?.BackButton.show(),
  hide: () => getTg()?.BackButton.hide(),
  onClick: (cb: () => void) => getTg()?.BackButton.onClick(cb),
  offClick: (cb: () => void) => getTg()?.BackButton.offClick(cb),
};

export const closeTelegramApp = (): void => {
  getTg()?.close();
};

export const openTelegramLink = (url: string): void => {
  const tg = getTg();
  if (!tg) {
    window.open(url, "_blank");
    return;
  }
  // ля t.me-ссылок используем openTelegramLink, для остальных — openLink
  if (url.startsWith("https://t.me/")) {
    tg.openTelegramLink(url);
  } else {
    tg.openLink(url);
  }
};
