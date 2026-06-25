import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ProductTabsClient } from "@/components/catalog/ProductTabsClient";
import {
  formatPrice,
  formatStockLabel,
  isInStock,
} from "@/domains/catalog/entity/product";
import {
  getProductBySlug,
  getProducts,
} from "@/domains/catalog/repository/productRepository";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ParallelRoutesLayout(
  props: LayoutProps<"/demo/parallel-routes/[slug]">,
) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) return null;

  const inStock = isInStock(product);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <nav className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/demo" className="hover:text-rose-500">
          Démo
        </Link>
        <span className="mx-2">/</span>
        <span>Parallel Routes (exercice 08)</span>
      </nav>

      <p className="mb-8 rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Slots <code>@similar</code> et <code>@sponsored</code> chargés
        indépendamment avec leurs propres <code>loading.tsx</code>.
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-lavender-100 dark:bg-slate-800">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
            {product.name}
          </h1>
          <ProductTabsClient slug={slug} product={product} />
          <p className="mt-6 text-3xl font-bold">{formatPrice(product)}</p>
          <p className="mt-2 text-sm text-slate-500">
            {formatStockLabel(product)}
          </p>
          {!inStock && (
            <p className="mt-4 text-sm text-rose-500">Produit indisponible</p>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Suspense fallback={null}>{props.similar}</Suspense>
        <Suspense fallback={null}>{props.sponsored}</Suspense>
      </div>

      {props.children}
    </div>
  );
}
