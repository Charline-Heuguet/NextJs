import { NextResponse } from "next/server";
import { addProductToCart } from "@/domains/cart/repository/cartRepository";

type CartPayload = {
  slug: string;
  name: string;
  price: number;
  currency: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CartPayload>;

  if (
    !body.slug ||
    !body.name ||
    typeof body.price !== "number" ||
    !body.currency
  ) {
    return NextResponse.json(
      { error: "Payload panier invalide." },
      { status: 400 },
    );
  }

  const summary = await addProductToCart({
    productSlug: body.slug,
    name: body.name,
    price: body.price,
    currency: body.currency,
  });

  return NextResponse.json(summary);
}
