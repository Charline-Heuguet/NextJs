import fr from "@/lib/i18n/locales/fr.json";
import en from "@/lib/i18n/locales/en.json";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export type Locale = "fr" | "en";

const dictionaries = { fr, en } as const;

export function parseLocale(value: string | undefined | null): Locale | null {
  if (value === "fr" || value === "en") return value;
  return null;
}

export function detectLocaleFromAcceptLanguage(
  acceptLanguage: string | null,
): Locale {
  if (!acceptLanguage) return "fr";
  return acceptLanguage.toLowerCase().includes("en") ? "en" : "fr";
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function translate(locale: Locale, key: string): string {
  const parts = key.split(".");
  let current: unknown = getDictionary(locale);

  for (const part of parts) {
    if (current === null || typeof current !== "object") return key;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : key;
}
