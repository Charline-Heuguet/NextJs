import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

function HeaderFallback() {
  return (
    <header className="border-b border-lavender-200 bg-lavender-50/80 dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto h-16 max-w-6xl animate-pulse px-6" />
    </header>
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <h1 className="font-display text-6xl font-semibold text-lavender-900 dark:text-lavender-100">
          404
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Cette page n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-rose-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-400"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
