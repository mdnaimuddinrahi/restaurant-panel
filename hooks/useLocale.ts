// hooks/useLocale.ts

import { useTranslation } from "react-i18next";

export function useLocale() {
  const { i18n } = useTranslation();

  switch (i18n.language) {
    case "bd":
      return "bn-BD";

    case "en":
      return "en-US";

    case "fr":
      return "fr-FR";

    case "de":
      return "de-DE";

    case "es":
      return "es-ES";

    default:
      return "en-US";
  }
}