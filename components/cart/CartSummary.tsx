import { getCartSummary } from "@/domains/cart/repository/cartRepository";

export async function CartSummary() {
  const { itemCount, total, items } = await getCartSummary();
  const currency = items[0]?.currency ?? "EUR";

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-lavender-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
      aria-label={`Panier : ${itemCount} article${itemCount > 1 ? "s" : ""}`}
    >
      <svg
        className="h-4 w-4 text-rose-500 dark:text-rose-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="font-medium text-lavender-900 dark:text-lavender-100">
        {itemCount}
      </span>
      {itemCount > 0 && (
        <span className="text-slate-500 dark:text-slate-400">
          · {total.toFixed(2)} {currency}
        </span>
      )}
    </div>
  );
}
