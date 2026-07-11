// utils/formatNumber.ts

export function formatNumber(
  value: number | string,
  locale: string,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, options).format(Number(value));
}