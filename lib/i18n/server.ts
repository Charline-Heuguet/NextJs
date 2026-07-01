import { cookies } from "next/headers";
import {
  LOCALE_COOKIE,
  parseLocale,
  translate,
  type Locale,
} from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return parseLocale(cookieStore.get(LOCALE_COOKIE)?.value) ?? "fr";
}

export async function t(key: string): Promise<string> {
  const locale = await getLocale();
  return translate(locale, key);
}

export { translate };
