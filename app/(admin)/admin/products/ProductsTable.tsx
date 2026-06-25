import Link from "next/link";
import {
  formatPrice,
  formatStockLabel,
  isInStock,
} from "@/domains/catalog/entity/product";
import { listProductsFromDb } from "@/domains/catalog/repository/productRepository";

export async function ProductsTable() {
  const products = await listProductsFromDb();

  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center text-slate-400">
        Aucun produit en base. Lancez{" "}
        <code className="text-rose-300">npm run db:seed</code>.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-700 bg-slate-800/80">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-400">Nom</th>
            <th className="px-4 py-3 font-medium text-slate-400">SKU</th>
            <th className="px-4 py-3 font-medium text-slate-400">Prix</th>
            <th className="px-4 py-3 font-medium text-slate-400">Stock</th>
            <th className="px-4 py-3 font-medium text-slate-400" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {products.map((product) => (
            <tr key={product.id} className="transition hover:bg-slate-800/50">
              <td className="px-4 py-3">
                <span className="font-medium text-lavender-100">
                  {product.name}
                </span>
                <span className="ml-2 text-slate-500">
                  {product.brand} · {product.category}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-400">{product.sku}</td>
              <td className="px-4 py-3 text-slate-300">
                {formatPrice(product)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    isInStock(product)
                      ? "text-rose-300"
                      : "text-slate-500"
                  }
                >
                  {formatStockLabel(product)}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/products/${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-rose-300"
                >
                  Voir →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
