/**
 * пределяет, в какой платформе запущено приложение.
 */

export type Platform = "max" | "telegram" | "web";

export function detectPlatform(): Platform {
  if (typeof window === "undefined") return "web";

  // MAX Bridge
  if (window.WebApp) return "max";

  // Telegram WebApp
  if (window.Telegram?.WebApp?.initData !== undefined) return "telegram";

  return "web";
}

export const platform: Platform = detectPlatform();

export const isMax = () => platform === "max";
export const isTelegram = () => platform === "telegram";
export const isWeb = () => platform === "web";
export const isMiniApp = () => platform !== "web";
