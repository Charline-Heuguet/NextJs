import Link from "next/link";
import Image from "next/image";
import { ProductTabsClient } from "@/components/catalog/ProductTabsClient";
import type { Product } from "@/domains/catalog/entity/product";
import {
  formatPrice,
  formatStockLabel,
} from "@/domains/catalog/entity/product";

export function DemoNav({
  current,
  slug,
}: {
  current: "static" | "isr" | "dynamic";
  slug: string;
}) {
  const links = [
    {
      id: "static" as const,
      href: `/demo/rendering/static/${slug}`,
      label: "01 Statique",
    },
    {
      id: "isr" as const,
      href: `/demo/rendering/isr/${slug}`,
      label: "02 ISR",
    },
    {
      id: "dynamic" as const,
      href: `/demo/rendering/dynamic/${slug}`,
      label: "03 Dynamique",
    },
  ];

  return (
    <nav className="mb-8 flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            current === link.id
              ? "bg-rose-500 text-white"
              : "border border-lavender-200 text-slate-600 hover:border-rose-300 dark:border-slate-700 dark:text-slate-300"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

type DemoProductShellProps = {
  mode: string;
  slug: string;
  product: Product;
  inStock: boolean;
  navCurrent: "static" | "isr" | "dynamic";
};

export function DemoProductShell({
  mode,
  slug,
  product,
  inStock,
  navCurrent,
}: DemoProductShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <DemoNav current={navCurrent} slug={slug} />
      <p className="mb-6 rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Mode : <strong>{mode}</strong> — consultez la console serveur pour le
        temps de rendu et mesurez le TTFB dans les DevTools réseau.
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
    </div>
  );
}
