import { unstable_cache } from "next/cache";
import { findAllProducts } from "@/domains/catalog/data/productData";

export const CATALOG_PRODUCTS_TAG = "catalog-products";

export const getCachedCatalogProducts = unstable_cache(
  async () => findAllProducts(),
  ["catalog-products"],
  { tags: [CATALOG_PRODUCTS_TAG] },
);
