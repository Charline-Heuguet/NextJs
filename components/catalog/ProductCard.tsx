import Image from "next/image";
import { cookies } from "next/headers";
import type { Product } from "@/domains/catalog/entity/product";
import { PrefetchLink } from "@/components/layout/PrefetchLink";
import {
  AB_PREFETCH_COOKIE,
  parseAbPrefetchVariant,
} from "@/lib/ab-test";
import {
  formatPrice,
  getProductPath,
  isInStock,
  isLowStock,
} from "@/domains/catalog/entity/product";

type ProductCardProps = {
  product: Product;
};

export async function ProductCard({ product }: ProductCardProps) {
  const cookieStore = await cookies();
  const variant =
    parseAbPrefetchVariant(cookieStore.get(AB_PREFETCH_COOKIE)?.value) ?? "A";
  const inStock = isInStock(product);
  const lowStock = isLowStock(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-lavender-200 bg-white shadow-sm transition hover:border-rose-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-rose-400">
      <PrefetchLink
        href={getProductPath(product)}
        prefetch={variant === "A"}
        prefetchOnHover={variant === "B"}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-square overflow-hidden bg-lavender-100 dark:bg-slate-800">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          {!inStock && (
            <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white">
              Rupture
            </span>
          )}
          {inStock && lowStock && (
            <span className="absolute left-3 top-3 rounded-full bg-rose-400/90 px-2.5 py-1 text-xs font-medium text-white">
              Plus que {product.stock}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {product.brand} · {product.category}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-lavender-900 dark:text-lavender-100">
            {product.name}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {product.description}
          </p>
          <div className="mt-auto pt-4">
            <p className="text-xl font-bold text-lavender-900 dark:text-lavender-100">
              {formatPrice(product)}
            </p>
            <span className="mt-2 inline-flex items-center text-sm font-medium text-rose-500 dark:text-rose-300">
              Voir le produit
              <svg
                className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </PrefetchLink>
    </article>
  );
}
