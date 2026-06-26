"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { CATALOG_PRODUCTS_TAG } from "@/lib/cache/products";
import { prisma } from "@/lib/prisma";

const updateProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1, "Nom requis"),
  description: z.string().min(1, "Description requise"),
  price: z.coerce.number().positive("Prix invalide"),
  stock: z.coerce.number().int().min(0, "Stock invalide"),
  forceError: z.string().optional(),
});

export type UpdateProductState = {
  error?: string;
  success?: string;
};

export async function updateProduct(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Accès refusé" };
  }

  const parsed = updateProductSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    forceError: formData.get("forceError"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  if (parsed.data.forceError === "1") {
    return { error: "Erreur simulée pour test UX" };
  }

  try {
    const updated = await prisma.product.update({
      where: { slug: parsed.data.slug },
      data: {
        name: parsed.data.name.trim(),
        description: parsed.data.description.trim(),
        price: parsed.data.price,
        stock: parsed.data.stock,
      },
    });

    if (!updated) {
      return { error: "Produit introuvable" };
    }
  } catch {
    return { error: "La mise à jour a échoué" };
  }

  revalidateTag(CATALOG_PRODUCTS_TAG, "max");
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${parsed.data.slug}`);

  return { success: "Produit mis à jour" };
}
