import { connection } from "next/server";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getSimilarProducts } from "@/domains/catalog/repository/productRepository";
import { simulateSlowFetch } from "@/lib/perf/timing";

type SimilarProductsProps = {
  slug: string;
  delayMs?: number;
};

export async function SimilarProducts({
  slug,
  delayMs = 1500,
}: SimilarProductsProps) {
  await connection();
  await simulateSlowFetch(delayMs);

  const products = await getSimilarProducts(slug);
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-semibold text-lavender-900 dark:text-lavender-100">
        Produits similaires
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}

export function SimilarProductsSkeleton() {
  return (
    <section className="mt-16">
      <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-lavender-100 dark:bg-slate-800" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-2xl bg-lavender-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </section>
  );
}
