"use client";

import { useEffect } from "react";

export default function FrontError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="rounded-2xl border border-rose-300 bg-lavender-50 p-8 dark:border-rose-400/30 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-lavender-900 dark:text-lavender-100">
          Une erreur est survenue
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-rose-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-400"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
