import type { SponsoredProduct } from "@/domains/sponsored/entity/sponsoredProduct";
import {
  fetchSponsoredProductByHandle,
  fetchSponsoredProductNodes,
  mapGraphQLNodeToSponsored,
  type SponsoredCacheStrategy,
} from "@/lib/graphql/sponsoredProducts";

export async function getSponsoredProducts(
  limit = 4,
  strategy: SponsoredCacheStrategy = "revalidate",
): Promise<SponsoredProduct[]> {
  const nodes = await fetchSponsoredProductNodes(limit, strategy);
  return nodes.map(mapGraphQLNodeToSponsored);
}

export async function getSponsoredProductByHandle(
  handle: string,
  strategy: SponsoredCacheStrategy = "revalidate",
): Promise<SponsoredProduct | null> {
  const node = await fetchSponsoredProductByHandle(handle, strategy);
  if (!node) return null;
  return mapGraphQLNodeToSponsored(node);
}
