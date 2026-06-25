import type { Product } from "@/domains/catalog/entity/product";
import {
  findAllProducts,
  findProductBySlug as findProductBySlugInData,
  findSimilarProducts as findSimilarProductsInData,
} from "@/domains/catalog/data/productData";

export async function getProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findProductBySlugInData(slug);
}

export async function getSimilarProducts(slug: string): Promise<Product[]> {
  return findSimilarProductsInData(slug);
}

export async function listProductsFromDb(): Promise<Product[]> {
  return getProducts();
}
