import Link from "next/link";
import { Suspense } from "react";
import { AuthNav } from "@/components/layout/AuthNav";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartSummarySkeleton } from "@/components/cart/CartSummarySkeleton";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/sponsored", label: "Sponsorisés" },
  { href: "/demo", label: "Démo" },
];

export function Header() {
  return (
    <header className="border-b border-lavender-200 bg-lavender-50/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-lavender-900 transition-colors hover:text-rose-500 dark:text-lavender-100 dark:hover:text-rose-300"
        >
          My supa store
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Navigation principale">
            <ul className="flex items-center gap-6">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
