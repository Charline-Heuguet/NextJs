import Link from "next/link";
import { getProducts } from "@/domains/catalog/repository/productRepository";
import { getSponsoredProducts } from "@/domains/sponsored/repository/sponsoredRepository";
import type { SponsoredCacheStrategy } from "@/lib/graphql/sponsoredProducts";

const strategies: SponsoredCacheStrategy[] = [
  "force-cache",
  "no-store",
  "revalidate",
];

export default async function CacheDemoPage() {
  const products = await getProducts();
  const sample = products[0];

  const timings = await Promise.all(
    strategies.map(async (strategy) => {
      const start = performance.now();
      await getSponsoredProducts(3, strategy);
      return {
        strategy,
        ms: Math.round(performance.now() - start),
      };
    }),
  );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Revalidation du cache GraphQL
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
        Exercice 07 — les durées ci-dessous sont mesurées côté serveur à chaque
        chargement. Consultez aussi la console pour les logs{" "}
        <code>[mockShop]</code>.
      </p>

      <ul className="mt-8 space-y-3">
        {timings.map(({ strategy, ms }) => (
          <li
            key={strategy}
            className="rounded-xl border border-lavender-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <strong>{strategy}</strong> — {ms} ms
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        Utilisez le bouton « Actualiser » sur l&apos;accueil ou les fiches
        produit pour tester <code>revalidateTag</code>. La page{" "}
        <Link href="/sponsored" className="text-rose-500 hover:underline">
          /sponsored
        </Link>{" "}
        peut être invalidée via <code>revalidatePath</code>.
      </p>

      {sample && (
        <Link
          href={`/products/${sample.slug}`}
          className="mt-6 inline-block rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white hover:bg-rose-400"
        >
          Voir une fiche produit avec bouton Actualiser
        </Link>
      )}
    </div>
  );
}
