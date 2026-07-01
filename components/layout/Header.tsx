import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { SiteNameBanner } from "@/components/env/SiteNameBanner";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { AuthNav } from "@/components/layout/AuthNav";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartSummarySkeleton } from "@/components/cart/CartSummarySkeleton";
import { getLocale, translate } from "@/lib/i18n/server";

const navHrefs = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "nav.products" },
  { href: "/sponsored", key: "nav.sponsored" },
  { href: "/demo", key: "nav.demo" },
] as const;

export async function Header() {
  await connection();
  const locale = await getLocale();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "My supa store";

  const labels = navHrefs.map(({ key }) => translate(locale, key));

  return (
    <header className="border-b border-lavender-200 bg-lavender-50/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex flex-col">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight text-lavender-900 transition-colors hover:text-rose-500 dark:text-lavender-100 dark:hover:text-rose-300"
          >
            {siteName}
          </Link>
          <SiteNameBanner />
        </div>

        <div className="flex items-center gap-4">
          <nav aria-label="Navigation principale">
            <ul className="flex items-center gap-6">
              {navHrefs.map(({ href }, index) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-300"
                  >
                    {labels[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher initialLocale={locale} />
          <Suspense fallback={null}>
            <AuthNav />
          </Suspense>
          <Suspense fallback={<CartSummarySkeleton />}>
            <CartSummary />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
