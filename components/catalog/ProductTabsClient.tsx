"use client";

import { useSearchParams } from "next/navigation";
import { ProductTabs } from "@/components/catalog/ProductTabs";
import type { Product } from "@/domains/catalog/entity/product";
import { parseProductTab } from "@/domains/catalog/entity/product";

type ProductTabsClientProps = {
  slug: string;
  product: Product;
};

export function ProductTabsClient({ slug, product }: ProductTabsClientProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = parseProductTab(
    typeof tabParam === "string" ? tabParam : undefined,
  );

  return <ProductTabs slug={slug} product={product} activeTab={activeTab} />;
}
