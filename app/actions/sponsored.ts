"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { SPONSORED_PRODUCTS_TAG } from "@/lib/graphql/sponsoredProducts";

export async function refreshSponsoredProducts() {
  revalidateTag(SPONSORED_PRODUCTS_TAG, "max");
  revalidatePath("/");
  revalidatePath("/sponsored");
  revalidatePath("/products", "layout");
}

export async function refreshSponsoredProductsByPath() {
  revalidatePath("/sponsored");
  revalidatePath("/");
}
