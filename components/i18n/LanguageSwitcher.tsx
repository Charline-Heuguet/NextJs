"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { setLocale as setLocaleAction } from "@/app/actions/locale";
import { initI18n } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  initialLocale: Locale;
};

export function LanguageSwitcher({ initialLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    initI18n(locale);
  }, [locale]);

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale || isPending) return;

    startTransition(async () => {
      await setLocaleAction(nextLocale);
      setLocale(nextLocale);
      router.refresh();
    });
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-lavender-200 p-0.5 dark:border-slate-600"
      data-testid="language-switcher"
      aria-label={locale === "fr" ? "Langue" : "Language"}
    >
      {(["fr", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          aria-pressed={locale === code}
          data-testid={`locale-${code}`}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
            locale === code
              ? "bg-rose-500 text-white"
              : "text-slate-500 hover:text-rose-500 dark:text-slate-400"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
