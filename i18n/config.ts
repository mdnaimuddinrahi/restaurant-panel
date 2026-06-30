export const defaultLanguage = "en";

export const supportedLanguages = [
    "en",
    "bn"
] as const;

export type Language = typeof supportedLanguages[number];