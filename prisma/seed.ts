import { PrismaClient, type Prisma } from "../generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import productsJson from "../domains/catalog/data/products.json";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

type JsonProduct = {
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
  images: { main: string; gallery: string[] };
  specs: Record<string, unknown>;
  similar?: string[];
};

const products = productsJson as unknown as JsonProduct[];

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      currency: product.currency,
      stock: product.stock,
      sku: product.sku,
      category: product.category,
      brand: product.brand,
      images: product.images as Prisma.InputJsonValue,
      specs: product.specs as Prisma.InputJsonValue,
      similar: (product.similar ?? []) as Prisma.InputJsonValue,
    })),
  });

  console.log(`Seed OK: ${products.length} produits insérés.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
