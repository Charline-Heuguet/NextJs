import type {
  CartItem,
  CartSummary,
} from "@/domains/cart/entity/cart";
import {
  computeCartSummary,
  emptyCartSummary,
} from "@/domains/cart/entity/cart";
import { prisma } from "@/lib/prisma";
import {
  getCartSessionId,
  setCartSessionId,
} from "@/lib/cart/cookies";
import { randomUUID } from "crypto";

function mapCartItem(row: {
  id: string;
  productSlug: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
}): CartItem {
  return {
    id: row.id,
    productSlug: row.productSlug,
    name: row.name,
    price: row.price,
    currency: row.currency,
    quantity: row.quantity,
  };
}

async function getOrCreateCartId(): Promise<string> {
  const sessionId = (await getCartSessionId()) ?? randomUUID();
  const cart = await prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
  });

  if (!(await getCartSessionId())) {
    await setCartSessionId(sessionId);
  }

  return cart.id;
}

export async function getCartSummary(): Promise<CartSummary> {
  const sessionId = await getCartSessionId();
  if (!sessionId) return emptyCartSummary();

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  if (!cart) return emptyCartSummary();

  const items = cart.items.map(mapCartItem);
  return { items, ...computeCartSummary(items) };
}

export async function addProductToCart(input: {
  productSlug: string;
  name: string;
  price: number;
  currency: string;
}): Promise<CartSummary> {
  const cartId = await getOrCreateCartId();
  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productSlug: {
        cartId,
        productSlug: input.productSlug,
      },
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId,
        productSlug: input.productSlug,
        name: input.name,
        price: input.price,
        currency: input.currency,
      },
    });
  }

  return getCartSummary();
}

export async function getCartQuantityForProduct(
  productSlug: string,
): Promise<number> {
  const sessionId = await getCartSessionId();
  if (!sessionId) return 0;

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  return (
    cart?.items.find((item) => item.productSlug === productSlug)?.quantity ?? 0
  );
}
