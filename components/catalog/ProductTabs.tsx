import Link from "next/link";
import type { Product } from "@/domains/catalog/entity/product";
import {
  formatSpecLabel,
  formatSpecValue,
  type ProductTab,
} from "@/domains/catalog/entity/product";

type ProductTabsProps = {
  slug: string;
  product: Product;
  activeTab: ProductTab;
};

const tabs: { id: ProductTab; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Spécifications" },
];

export function ProductTabs({ slug, product, activeTab }: ProductTabsProps) {
  return (
    <div className="mt-6">
      <div
        className="flex gap-2 border-b border-lavender-200 dark:border-slate-700"
        role="tablist"
        aria-label="Informations produit"
      >
        {tabs.map(({ id, label }) => (
          <Link
            key={id}
            href={`/products/${slug}?tab=${id}`}
            role="tab"
            aria-selected={activeTab === id}
            className={`border-b-2 px-3 pb-2 text-sm font-medium transition-colors ${
              activeTab === id
                ? "border-rose-500 text-lavender-900 dark:border-rose-300 dark:text-lavender-100"
                : "border-transparent text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-4 text-slate-600 dark:text-slate-400" role="tabpanel">
        {activeTab === "description" && (
          <p className="text-base leading-relaxed">{product.description}</p>
        )}

        {activeTab === "specifications" && (
          <dl className="space-y-3 text-sm">
            {Object.entries(product.specs).map(([key, value]) =>
              value !== undefined && value !== null ? (
                <div
                  key={key}
                  className="flex justify-between gap-4 border-b border-lavender-100 pb-2 dark:border-slate-800"
                >
                  <dt className="text-slate-500 dark:text-slate-400">
                    {formatSpecLabel(key)}
                  </dt>
                  <dd className="font-medium text-lavender-900 dark:text-lavender-100">
                    {formatSpecValue(value)}
                  </dd>
                </div>
              ) : null,
            )}
            {Object.keys(product.specs).length === 0 && (
              <p className="text-slate-500">Aucune spécification disponible.</p>
            )}
          </dl>
        )}
      </div>
    </div>
  );
}
