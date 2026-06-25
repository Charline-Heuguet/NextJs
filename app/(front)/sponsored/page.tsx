import Link from "next/link";
import { Suspense } from "react";
import {
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/sponsored/SponsoredProducts";

export const metadata = {
  title: "Produits sponsorisés",
  description: "Catalogue GraphQL des produits sponsorisés",
};

export default function SponsoredPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <nav className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="transition-colors hover:text-rose-500 dark:hover:text-rose-300"
        >
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-lavender-900 dark:text-lavender-100">
          Produits sponsorisés
        </span>
      </nav>

      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Produits sponsorisés
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
        Données consommées depuis l&apos;endpoint GraphQL mockShop. Aucun ajout
        au panier sur cette section.
      </p>

      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredProducts limit={10} showRefresh />
      </Suspense>
    </div>
  );
}
