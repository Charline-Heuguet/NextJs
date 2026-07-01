import i18n from "i18next";
import fr from "@/lib/i18n/locales/fr.json";
import en from "@/lib/i18n/locales/en.json";
import type { Locale } from "@/lib/i18n";

let initialized = false;

export function initI18n(locale: Locale) {
  if (initialized && i18n.language === locale) return i18n;

  if (!initialized) {
    i18n.init({
      lng: locale,
      fallbackLng: "fr",
      resources: {
        fr: { translation: fr },
        en: { translation: en },
      },
    });
    initialized = true;
  } else {
    void i18n.changeLanguage(locale);
  }

  return i18n;
}
