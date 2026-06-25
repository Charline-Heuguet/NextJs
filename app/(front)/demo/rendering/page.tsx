import Link from "next/link";
import { getProducts } from "@/domains/catalog/repository/productRepository";

export default async function RenderingDemoIndex() {
  const products = await getProducts();
  const sample = products[0];

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Comparer les stratégies de rendu
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
        Exercices 01 à 03 : mesurez le TTFB et le temps de rendu côté serveur
        (console) pour chaque mode.
      </p>

      {sample && (
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <DemoCard
            title="01 — Statique full"
            description="generateStaticParams, pas de searchParams serveur."
            href={`/demo/rendering/static/${sample.slug}`}
          />
          <DemoCard
            title="02 — ISR"
            description="revalidate = 60. Modifiez une donnée via Prisma Studio."
            href={`/demo/rendering/isr/${sample.slug}`}
          />
          <DemoCard
            title="03 — Dynamique"
            description="force-dynamic, rendu à chaque requête."
            href={`/demo/rendering/dynamic/${sample.slug}`}
          />
        </div>
      )}
    </div>
  );
}

function DemoCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-lavender-200 bg-white p-6 transition hover:border-rose-300 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </Link>
  );
}
