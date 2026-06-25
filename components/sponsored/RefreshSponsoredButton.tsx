"use client";

import { useTransition } from "react";
import { refreshSponsoredProducts } from "@/app/actions/sponsored";

export function RefreshSponsoredButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => refreshSponsoredProducts())}
      className="rounded-full border border-lavender-200 px-4 py-1.5 text-sm font-medium text-lavender-900 transition-colors hover:border-rose-300 hover:text-rose-500 disabled:opacity-60 dark:border-slate-700 dark:text-lavender-100 dark:hover:text-rose-300"
    >
      {isPending ? "Actualisation..." : "Actualiser"}
    </button>
  );
}
