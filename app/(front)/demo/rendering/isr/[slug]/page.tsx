import { notFound } from "next/navigation";
import { DemoNav } from "@/app/(front)/demo/rendering/_shared";
import { IsrDemoContent } from "@/app/(front)/demo/rendering/_modes";
import { isInStock } from "@/domains/catalog/entity/product";
import {
  getProductBySlug,
  getProducts,
} from "@/domains/catalog/repository/productRepository";
import { logRenderTiming } from "@/lib/perf/timing";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function IsrRenderingDemo(
  props: PageProps<"/demo/rendering/isr/[slug]">,
) {
  const start = performance.now();
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  logRenderTiming("demo ISR (cacheLife revalidate=60)", start);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <DemoNav current="isr" slug={slug} />
      <p className="mb-6 rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Mode : <strong>ISR via cacheLife (revalidate = 60s)</strong> —
        modifiez une donnée en base puis observez le rebuild en arrière-plan.
      </p>
      <IsrDemoContent
        slug={slug}
        product={product}
        inStock={isInStock(product)}
      />
    </div>
  );
}
