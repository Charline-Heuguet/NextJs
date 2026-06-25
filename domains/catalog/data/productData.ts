import type {
  Product,
  ProductImages,
  ProductSpecs,
} from "@/domains/catalog/entity/product";
import { prisma } from "@/lib/prisma";

function mapImages(images: unknown): ProductImages {
  const raw = images as { main?: string; gallery?: string[] } | null;
  if (!raw || typeof raw.main !== "string") {
    return { main: "", gallery: [] };
  }
  const gallery = Array.isArray(raw.gallery)
    ? raw.gallery.filter((url): url is string => typeof url === "string")
    : [];
  return { main: raw.main, gallery };
}

function mapSpecs(specs: unknown): ProductSpecs {
  if (specs === null || typeof specs !== "object") return {};
  return specs as ProductSpecs;
}

function mapSimilar(similar: unknown): string[] {
  if (!Array.isArray(similar)) return [];
  return similar.filter((slug): slug is string => typeof slug === "string");
}

function mapRowToProduct(row: {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: unknown;
  specs: unknown;
  similar: unknown;
}): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    currency: row.currency,
    stock: row.stock,
    sku: row.sku,
    category: row.category,
    brand: row.brand,
    images: mapImages(row.images),
    specs: mapSpecs(row.specs),
    similar: mapSimilar(row.similar),
  };
}

export async function findAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapRowToProduct);
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  if (!row) return null;
  return mapRowToProduct(row);
}

export async function findSimilarProducts(slug: string): Promise<Product[]> {
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return [];

  const similarSlugs = mapSimilar(product.similar);
  if (similarSlugs.length === 0) return [];

  const rows = await prisma.product.findMany({
    where: { slug: { in: similarSlugs } },
  });

  const bySlug = new Map(rows.map((row) => [row.slug, mapRowToProduct(row)]));
  return similarSlugs
    .map((similarSlug) => bySlug.get(similarSlug))
    .filter((entry): entry is Product => entry !== undefined);
}
