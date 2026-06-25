import Image from "next/image";
import Link from "next/link";
import type { SponsoredProduct } from "@/domains/sponsored/entity/sponsoredProduct";
import {
  formatSponsoredPrice,
  getSponsoredProductPath,
} from "@/domains/sponsored/entity/sponsoredProduct";

type SponsoredProductCardProps = {
  product: SponsoredProduct;
};

export function SponsoredProductCard({ product }: SponsoredProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-lavender-200 bg-white shadow-sm transition hover:border-rose-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <Link href={getSponsoredProductPath(product.handle)} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden bg-lavender-100 dark:bg-slate-800">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Sans image
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-rose-500/90 px-2.5 py-1 text-xs font-medium text-white">
            Sponsorisé
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-lavender-900 dark:text-lavender-100">
            {product.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {product.description}
          </p>
          <p className="mt-auto pt-4 text-xl font-bold text-lavender-900 dark:text-lavender-100">
            {formatSponsoredPrice(product)}
          </p>
        </div>
      </Link>
    </article>
  );
}
