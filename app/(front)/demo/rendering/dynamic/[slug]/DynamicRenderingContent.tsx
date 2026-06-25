import { connection } from "next/server";
import { notFound } from "next/navigation";
import { DemoNav } from "@/app/(front)/demo/rendering/_shared";
import { DynamicDemoMarker } from "@/app/(front)/demo/rendering/_modes";
import { DemoProductContent } from "@/app/(front)/demo/rendering/_modes";
import { isInStock } from "@/domains/catalog/entity/product";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";
import { logRenderTiming } from "@/lib/perf/timing";

export default async function DynamicRenderingContent({
  slug,
}: {
  slug: string;
}) {
  await connection();

  const start = performance.now();
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  logRenderTiming("demo dynamique (connection)", start);

  return (
    <>
      <DynamicDemoMarker />
      <p className="mb-6 rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Mode : <strong>Dynamique (connection())</strong> — rendu à chaque
        requête, compatible avec cacheComponents.
      </p>
      <DemoProductContent
        slug={slug}
        product={product}
        inStock={isInStock(product)}
      />
    </>
  );
}
