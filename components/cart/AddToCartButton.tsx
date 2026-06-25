"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type AddToCartButtonProps = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  disabled?: boolean;
};

export function AddToCartButton({
  slug,
  name,
  price,
  currency,
  disabled = false,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, price, currency }),
      });

      if (!response.ok) return;

      setAdded(true);
      router.refresh();
      setTimeout(() => setAdded(false), 2000);
    });
  }

  const label = disabled
    ? "Indisponible"
    : added
      ? "Ajouté"
      : isPending
        ? "Ajout..."
        : "Ajouter au panier";

  return (
    <button
      type="button"
      disabled={disabled || isPending}
      onClick={handleClick}
      className="mt-8 rounded-full bg-rose-500 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
    >
      {label}
    </button>
  );
}
