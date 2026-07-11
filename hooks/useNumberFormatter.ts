// hooks/useNumberFormatter.ts

import { useLocale } from "./useLocale";


export default function useNumberFormatter() {
  const locale = useLocale();

  return (
    value: number | string | null | undefined,
    options?: Intl.NumberFormatOptions
  ) => {
    if (value === null || value === undefined || value === "") {
      return "";
    }

    const number =
      typeof value === "number" ? value : Number(value);

    if (!Number.isFinite(number)) {
      return "";
    }

    return new Intl.NumberFormat(locale, options).format(number);
  };
}