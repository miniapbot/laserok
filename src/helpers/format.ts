/**
 * орматирует цену в вид "1 200 руб."
 */
export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(value);
  return `${formatted} руб.`;
}
