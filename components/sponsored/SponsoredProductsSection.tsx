import type { SponsoredProduct } from "@/domains/sponsored/entity/sponsoredProduct";
import { RefreshSponsoredButton } from "@/components/sponsored/RefreshSponsoredButton";
import { SponsoredProductCard } from "@/components/sponsored/SponsoredProductCard";

type SponsoredProductsSectionProps = {
  products: SponsoredProduct[];
  title?: string;
  showRefresh?: boolean;
};

export function SponsoredProductsSection({
  products,
  title = "Produits sponsorisés",
  showRefresh = false,
}: SponsoredProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-lavender-900 dark:text-lavender-100">
          {title}
        </h2>
        {showRefresh && <RefreshSponsoredButton />}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <SponsoredProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function SponsoredProductsSkeleton() {
  return (
    <section className="mt-16">
      <div className="mb-6 h-8 w-56 animate-pulse rounded-lg bg-lavender-100 dark:bg-slate-800" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl bg-lavender-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </section>
  );
}
