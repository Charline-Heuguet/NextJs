"use client";

import Link from "next/link";
import { useState } from "react";

export default function DemoPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Erreur volontaire pour tester error.tsx.");
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Pages de démo
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Testez loading.tsx, error.tsx et l&apos;API produits.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            Stratégies de rendu
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Exercices 01–03 : statique, ISR et force-dynamic.
          </p>
          <Link
            href="/demo/rendering"
            className="mt-4 inline-block rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-400"
          >
            Comparer les modes
          </Link>
        </section>

        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            Cache GraphQL
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Exercice 07 : force-cache, no-store, revalidate.
          </p>
          <Link
            href="/demo/cache"
            className="mt-4 inline-block rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-400"
          >
            Tester le cache
          </Link>
        </section>

        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            Parallel Routes
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Exercice 08 : slots @similar et @sponsored.
          </p>
          <Link
            href="/demo/parallel-routes/casque-over-ear-pro"
            className="mt-4 inline-block rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-400"
          >
            Voir les slots
          </Link>
        </section>

        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            Loading
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Skeleton affiché pendant 2 secondes.
          </p>
          <Link
            href="/demo/loading"
            className="mt-4 inline-block rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-400"
          >
            Tester le loading
          </Link>
        </section>

        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            Error boundary
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Déclenche error.tsx puis le bouton Réessayer.
          </p>
          <button
            type="button"
            onClick={() => setShouldThrow(true)}
            className="mt-4 rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-400"
          >
            Déclencher l&apos;erreur
          </button>
        </section>

        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            API produits
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            GET /api/products — liste JSON des produits.
          </p>
          <a
            href="/api/products"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full border border-lavender-200 px-5 py-2 text-sm font-medium text-lavender-900 transition-colors hover:border-rose-300 hover:text-rose-500 dark:border-slate-700 dark:text-lavender-100 dark:hover:text-rose-300"
          >
            Voir l&apos;API
          </a>
        </section>

        <section className="rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
            404
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Page inexistante pour tester not-found.tsx.
          </p>
          <Link
            href="/page-inexistante"
            className="mt-4 inline-block rounded-full border border-lavender-200 px-5 py-2 text-sm font-medium text-lavender-900 transition-colors hover:border-rose-300 hover:text-rose-500 dark:border-slate-700 dark:text-lavender-100 dark:hover:text-rose-300"
          >
            Tester le 404
          </Link>
        </section>
      </div>
    </div>
  );
}
