import { cacheLife } from "next/cache";
import Image from "next/image";
import { ProductTabsClient } from "@/components/catalog/ProductTabsClient";
import {
  formatPrice,
  formatStockLabel,
} from "@/domains/catalog/entity/product";
import type { Product } from "@/domains/catalog/entity/product";

type DemoProductContentProps = {
  slug: string;
  product: Product;
  inStock: boolean;
};

export function DemoProductContent({
  slug,
  product,
  inStock,
}: DemoProductContentProps) {
  return (
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
  );
}

export async function IsrDemoContent({
  slug,
  product,
  inStock,
}: DemoProductContentProps) {
  "use cache";
  cacheLife({ revalidate: 60 });

  return (
    <DemoProductContent slug={slug} product={product} inStock={inStock} />
  );
}

export async function DynamicDemoMarker() {
  return (
    <p className="mb-4 text-xs text-slate-400">
      Rendu dynamique confirmé via connection() — {new Date().toISOString()}
    </p>
  );
}
