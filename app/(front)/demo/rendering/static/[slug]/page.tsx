import { notFound } from "next/navigation";
import {
  DemoProductShell,
} from "@/app/(front)/demo/rendering/_shared";
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

export default async function StaticRenderingDemo(
  props: PageProps<"/demo/rendering/static/[slug]">,
) {
  const start = performance.now();
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  logRenderTiming("demo static full", start);

  return (
    <DemoProductShell
      mode="Statique (generateStaticParams)"
      slug={slug}
      product={product}
      inStock={isInStock(product)}
      navCurrent="static"
    />
  );
}
