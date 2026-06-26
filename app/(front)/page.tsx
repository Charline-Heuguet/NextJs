import { Suspense } from "react";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import {
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/sponsored/SponsoredProducts";
import { getCachedCatalogProducts } from "@/lib/cache/products";

export default async function Home() {
  const products = await getCachedCatalogProducts();

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <section className="mb-12 text-center">
        <h1 className="font-display text-5xl font-semibold tracking-tight text-lavender-900 dark:text-lavender-100">
          Bienvenue sur My supa store
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Découvrez notre sélection de produits tech soigneusement choisis.
        </p>
      </section>

      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredProducts limit={4} showRefresh />
      </Suspense>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold text-lavender-900 dark:text-lavender-100">
          Notre catalogue
        </h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
