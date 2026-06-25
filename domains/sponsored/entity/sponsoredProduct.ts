export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
};

export function formatSponsoredPrice(product: SponsoredProduct): string {
  return `${product.price.toFixed(2)} ${product.currency}`;
}

export function getSponsoredProductPath(handle: string): string {
  return `/sponsored/${handle}`;
}
