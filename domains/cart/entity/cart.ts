export type CartItem = {
  id: string;
  productSlug: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
};

export type CartSummary = {
  items: CartItem[];
  itemCount: number;
  total: number;
};

export function emptyCartSummary(): CartSummary {
  return { items: [], itemCount: 0, total: 0 };
}

export function computeCartSummary(
  items: CartItem[],
): Pick<CartSummary, "itemCount" | "total"> {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { itemCount, total };
}
