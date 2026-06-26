"use client";

import { useActionState } from "react";
import type { Product } from "@/domains/catalog/entity/product";
import { updateProduct, type UpdateProductState } from "@/app/actions/products";

type ProductEditFormProps = {
  product: Product;
};

const initialState: UpdateProductState = {};

export function ProductEditForm({ product }: ProductEditFormProps) {
  const [state, formAction, pending] = useActionState(updateProduct, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <input type="hidden" name="slug" value={product.slug} />

      {state.error && (
        <p className="rounded-lg border border-rose-400/40 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg border border-emerald-400/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
          {state.success}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-300">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product.name}
          className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={product.description}
          className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-300">
            Prix
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product.price}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div>
          <label htmlFor="stock" className="mb-1 block text-sm font-medium text-slate-300">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={product.stock}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button
          type="submit"
          name="forceError"
          value="1"
          disabled={pending}
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-60"
        >
          Tester une erreur
        </button>
      </div>
    </form>
  );
}
