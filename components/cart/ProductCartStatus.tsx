import { connection } from "next/server";
import { getCartQuantityForProduct } from "@/domains/cart/repository/cartRepository";

type ProductCartStatusProps = {
  productSlug: string;
};

export async function ProductCartStatus({ productSlug }: ProductCartStatusProps) {
  await connection();
  const quantity = await getCartQuantityForProduct(productSlug);

  if (quantity === 0) {
    return (
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Ce produit n&apos;est pas encore dans votre panier.
      </p>
    );
  }

  return (
    <p className="mt-4 text-sm font-medium text-rose-500 dark:text-rose-300">
      {quantity} exemplaire{quantity > 1 ? "s" : ""} dans le panier
    </p>
  );
}
