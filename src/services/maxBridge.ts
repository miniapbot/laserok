/**
 * бёртка над MAX Bridge SDK.
 * аботает безопасно: если приложение открыто не в MAX,
 * все методы просто ничего не делают.
 */

declare global {
  interface Window {
    WebApp?: {
      ready: () => void;
      close: () => void;
      initData: string;
      initDataUnsafe?: {
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
          language_code?: string;
        };
      };
      platform: string;
      version: string;
      themeParams?: Record<string, string>;
      colorScheme?: "light" | "dark";
      isExpanded?: boolean;
      viewportHeight?: number;
      viewportStableHeight?: number;
      viewportWidth?: number;
      enableClosingConfirmation: () => void;
      disableClosingConfirmation: () => void;
      onEvent?: (event: string, handler: () => void) => void;
      offEvent?: (event: string, handler: () => void) => void;
      sendData: (data: string) => void;
      openLink: (url: string) => void;
      openMaxLink: (url: string) => void;
      BackButton?: {
        show: () => void;
        hide: () => void;
        onClick: (cb: () => void) => void;
        offClick: (cb: () => void) => void;
      };
      HapticFeedback?: {
        impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
        notificationOccurred: (type: "error" | "success" | "warning") => void;
        selectionChanged: () => void;
      };
    };
  }
}

export const isMaxApp = (): boolean => {
  return typeof window !== "undefined" && !!window.WebApp;
};

export const initMaxApp = (): void => {
  if (!isMaxApp()) {
    console.warn("[MAX Bridge] риложение запущено вне MAX — SDK недоступен.");
    return;
  }
  window.WebApp!.ready();
};

export const getMaxUser = () => {
  return window.WebApp?.initDataUnsafe?.user ?? null;
};

export const getMaxInitData = (): string => {
  return window.WebApp?.initData ?? "";
};

export const getPlatform = (): string => {
  return window.WebApp?.platform ?? "web";
};

export const isDarkMode = (): boolean => {
  return window.WebApp?.colorScheme === "dark";
};

export const haptic = {
  light: () => window.WebApp?.HapticFeedback?.impactOccurred("light"),
  medium: () => window.WebApp?.HapticFeedback?.impactOccurred("medium"),
  success: () => window.WebApp?.HapticFeedback?.notificationOccurred("success"),
  error: () => window.WebApp?.HapticFeedback?.notificationOccurred("error"),
  selection: () => window.WebApp?.HapticFeedback?.selectionChanged(),
};

export const backButton = {
  show: () => window.WebApp?.BackButton?.show(),
  hide: () => window.WebApp?.BackButton?.hide(),
  onClick: (cb: () => void) => window.WebApp?.BackButton?.onClick(cb),
  offClick: (cb: () => void) => window.WebApp?.BackButton?.offClick(cb),
};

export const closeApp = (): void => {
  window.WebApp?.close();
};

export const openLink = (url: string): void => {
  window.WebApp?.openLink(url);
};
