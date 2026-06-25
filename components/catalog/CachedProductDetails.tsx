import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  formatStockLabel,
  isInStock,
} from "@/domains/catalog/entity/product";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";

type CachedProductDetailsProps = {
  slug: string;
};

export async function CachedProductDetails({ slug }: CachedProductDetailsProps) {
  "use cache";
  cacheLife("hours");

  const product = await getProductBySlug(slug);
  if (!product) return null;

  const inStock = isInStock(product);

  return (
    <>
      <nav className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="transition-colors hover:text-rose-500 dark:hover:text-rose-300"
        >
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/products"
          className="transition-colors hover:text-rose-500 dark:hover:text-rose-300"
        >
          Produits
        </Link>
        <span className="mx-2">/</span>
        <span className="text-lavender-900 dark:text-lavender-100">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-lavender-100 dark:bg-slate-800">
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {product.images.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.gallery.map((url, index) => (
                <div
                  key={url}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-lavender-200 dark:border-slate-700"
                >
                  <Image
                    src={url}
                    alt={`${product.name} - vue ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-lavender-900 dark:text-lavender-100 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-lavender-900 dark:text-lavender-100">
              {formatPrice(product)}
            </span>
            <span
              className={
                inStock
                  ? "text-sm text-rose-500 dark:text-rose-300"
                  : "text-sm text-slate-500 dark:text-slate-400"
              }
            >
              {formatStockLabel(product)}
            </span>
          </div>

          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
            Réf. {product.sku}
          </p>
        </div>
      </div>
    </>
  );
}

export async function getCachedProduct(slug: string) {
  "use cache";
  cacheLife("hours");
  return getProductBySlug(slug);
}
