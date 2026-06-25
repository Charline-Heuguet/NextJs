import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatSponsoredPrice,
} from "@/domains/sponsored/entity/sponsoredProduct";
import { getSponsoredProductByHandle } from "@/domains/sponsored/repository/sponsoredRepository";

export async function generateMetadata(
  props: PageProps<"/sponsored/[handle]">,
): Promise<Metadata> {
  const { handle } = await props.params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    return { title: "Produit sponsorisé introuvable" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function SponsoredProductPage(
  props: PageProps<"/sponsored/[handle]">,
) {
  const { handle } = await props.params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <nav className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="transition-colors hover:text-rose-500 dark:hover:text-rose-300"
        >
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/sponsored"
          className="transition-colors hover:text-rose-500 dark:hover:text-rose-300"
        >
          Sponsorisés
        </Link>
        <span className="mx-2">/</span>
        <span className="text-lavender-900 dark:text-lavender-100">
          {product.title}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-lavender-100 dark:bg-slate-800">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>

        <div>
          <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-500 dark:text-rose-300">
            Produit sponsorisé
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-lavender-900 dark:text-lavender-100 sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {product.description}
          </p>
          <p className="mt-8 text-3xl font-bold text-lavender-900 dark:text-lavender-100">
            {formatSponsoredPrice(product)}
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Produit externe — non disponible à l&apos;ajout au panier.
          </p>
        </div>
      </div>
    </div>
  );
}
