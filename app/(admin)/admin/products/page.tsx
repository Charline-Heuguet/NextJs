import { Suspense } from "react";
import { ProductsTable } from "./ProductsTable";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-lavender-100">Produits</h1>
        <p className="mt-1 text-sm text-slate-400">
          Gestion du catalogue depuis la base SQLite.
        </p>
      </div>

      <Suspense
        fallback={
          <p className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center text-slate-400">
            Chargement…
          </p>
        }
      >
        <ProductsTable />
      </Suspense>
    </div>
  );
}
