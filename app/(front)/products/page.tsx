import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getProducts } from "@/domains/catalog/repository/productRepository";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-lavender-900 dark:text-lavender-100">
          Tous nos produits
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {products.length} produits disponibles
        </p>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
