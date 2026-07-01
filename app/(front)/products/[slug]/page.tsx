import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductCartStatus } from "@/components/cart/ProductCartStatus";
import {
  CachedProductDetails,
  getCachedProduct,
} from "@/components/catalog/CachedProductDetails";
import { ProductTabsClient } from "@/components/catalog/ProductTabsClient";
import {
  SimilarProducts,
  SimilarProductsSkeleton,
} from "@/components/catalog/SimilarProducts";
import { isInStock } from "@/domains/catalog/entity/product";
import { getProducts } from "@/domains/catalog/repository/productRepository";
import {
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/sponsored/SponsoredProducts";
import { logRenderTiming } from "@/lib/perf/timing";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getCachedProduct(slug);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  const keywords = [
    product.name,
    product.brand,
    product.category,
    product.sku,
    "tech",
    "boutique",
  ];

  return {
    title: product.name,
    description: product.description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      locale: "fr_FR",
      siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "My supa store",
      images: [
        {
          url: product.images.main,
          alt: product.name,
        },
      ],
    },
  };
}

async function ProductActions({ slug }: { slug: string }) {
  const product = await getCachedProduct(slug);
  if (!product) return null;

  return (
    <div className="mt-8 border-t border-lavender-200 pt-8 dark:border-slate-700">
      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-xl bg-lavender-100 dark:bg-slate-800" />
        }
      >
        <ProductTabsClient slug={slug} product={product} />
      </Suspense>

      <AddToCartButton
        slug={product.slug}
        name={product.name}
        price={product.price}
        currency={product.currency}
        disabled={!isInStock(product)}
      />

      <Suspense
        fallback={
          <div className="mt-4 h-5 w-40 animate-pulse rounded bg-lavender-100 dark:bg-slate-800" />
        }
      >
        <ProductCartStatus productSlug={product.slug} />
      </Suspense>
    </div>
  );
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const start = performance.now();
  const { slug } = await props.params;
  const product = await getCachedProduct(slug);

  if (!product) {
    notFound();
  }

  logRenderTiming(`product page shell [${slug}]`, start);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <CachedProductDetails slug={slug} />

      <Suspense fallback={null}>
        <ProductActions slug={slug} />
      </Suspense>

      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts slug={slug} />
      </Suspense>

      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredProducts
          limit={4}
          title="Vous pourriez aussi aimer (sponsorisé)"
          showRefresh
        />
      </Suspense>
    </div>
  );
}
