import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { ProductEditForm } from "@/components/admin/ProductEditForm";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";

export const metadata = {
  title: "Modifier un produit",
};

async function EditProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Link
        href="/admin/products"
        className="text-sm text-slate-400 transition hover:text-rose-300"
      >
        ← Retour à la liste
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-lavender-100">
        Modifier {product.name}
      </h1>
      <p className="mt-1 text-sm text-slate-400">
        SKU {product.sku} · slug {product.slug}
      </p>
      <div className="mt-8">
        <ProductEditForm product={product} />
      </div>
    </>
  );
}

function EditProductFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-32 rounded bg-slate-800" />
      <div className="h-8 w-64 rounded bg-slate-800" />
      <div className="h-64 rounded-xl bg-slate-800" />
    </div>
  );
}

export default function EditProductPage(
  props: PageProps<"/admin/products/[slug]/edit">,
) {
  return (
    <Suspense fallback={<EditProductFallback />}>
      <EditProductContent params={props.params} />
    </Suspense>
  );
}
