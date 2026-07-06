export const defaultLanguage = "en";

export const supportedLanguages = [
    "en",
    "bd"
] as const;

export type Language = typeof supportedLanguages[number];