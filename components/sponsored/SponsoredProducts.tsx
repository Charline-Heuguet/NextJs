import { getSponsoredProducts } from "@/domains/sponsored/repository/sponsoredRepository";
import { SponsoredProductsSection } from "@/components/sponsored/SponsoredProductsSection";
import { simulateSlowFetch } from "@/lib/perf/timing";

type SponsoredProductsProps = {
  limit?: number;
  title?: string;
  showRefresh?: boolean;
  delayMs?: number;
};

export async function SponsoredProducts({
  limit = 4,
  title,
  showRefresh = false,
  delayMs = 1000,
}: SponsoredProductsProps) {
  await simulateSlowFetch(delayMs);
  const products = await getSponsoredProducts(limit);

  return (
    <SponsoredProductsSection
      products={products}
      title={title}
      showRefresh={showRefresh}
    />
  );
}

export { SponsoredProductsSkeleton } from "@/components/sponsored/SponsoredProductsSection";
