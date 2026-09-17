/**
 * диный API платформы — работает и в MAX, и в Telegram, и в браузере.
 * омпоненты используют ТЬ этот модуль.
 */

import { platform, isMax, isTelegram } from "./platform";
import {
  initMaxApp,
  getMaxUser,
  getMaxInitData,
  getPlatform as getMaxPlatform,
  isDarkMode as isMaxDark,
  haptic as maxHaptic,
  backButton as maxBack,
  closeApp as closeMaxApp,
  openLink as openMaxLink,
} from "./maxBridge";
import {
  initTelegramApp,
  getTelegramUser,
  getTelegramInitData,
  getTelegramPlatform,
  isTelegramDarkMode,
  telegramHaptic,
  telegramBackButton,
  closeTelegramApp,
  openTelegramLink,
} from "./telegramBridge";

// ===== нициализация =====
export const initPlatform = (): void => {
  if (isMax()) initMaxApp();
  else if (isTelegram()) initTelegramApp();
  else console.info("[Platform] еб-режим, SDK не требуется");
};

// ===== ользователь =====
export const getUser = () => {
  if (isMax()) return getMaxUser();
  if (isTelegram()) return getTelegramUser();
  return null;
};

export const getInitData = (): string => {
  if (isMax()) return getMaxInitData();
  if (isTelegram()) return getTelegramInitData();
  return "";
};

export const getPlatformName = (): string => {
  if (isMax()) return getMaxPlatform();
  if (isTelegram()) return getTelegramPlatform();
  return "web";
};

export const isDarkMode = (): boolean => {
  if (isMax()) return isMaxDark();
  if (isTelegram()) return isTelegramDarkMode();
  return false;
};

// ===== Haptic =====
export const haptic = {
  light: () => {
    if (isMax()) maxHaptic.light();
    else if (isTelegram()) telegramHaptic.light();
  },
  medium: () => {
    if (isMax()) maxHaptic.medium();
    else if (isTelegram()) telegramHaptic.medium();
  },
  success: () => {
    if (isMax()) maxHaptic.success();
    else if (isTelegram()) telegramHaptic.success();
  },
  error: () => {
    if (isMax()) maxHaptic.error();
    else if (isTelegram()) telegramHaptic.error();
  },
  selection: () => {
    if (isMax()) maxHaptic.selection();
    else if (isTelegram()) telegramHaptic.selection();
  },
};

// ===== BackButton =====
export const backButton = {
  show: () => {
    if (isMax()) maxBack.show();
    else if (isTelegram()) telegramBackButton.show();
  },
  hide: () => {
    if (isMax()) maxBack.hide();
    else if (isTelegram()) telegramBackButton.hide();
  },
  onClick: (cb: () => void) => {
    if (isMax()) maxBack.onClick(cb);
    else if (isTelegram()) telegramBackButton.onClick(cb);
  },
  offClick: (cb: () => void) => {
    if (isMax()) maxBack.offClick(cb);
    else if (isTelegram()) telegramBackButton.offClick(cb);
  },
};

// ===== рочее =====
export const closeApp = (): void => {
  if (isMax()) closeMaxApp();
  else if (isTelegram()) closeTelegramApp();
};

export const openLink = (url: string): void => {
  if (isMax()) openMaxLink(url);
  else if (isTelegram()) openTelegramLink(url);
  else window.open(url, "_blank");
};

export { platform, isMax, isTelegram };
