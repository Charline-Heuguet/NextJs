import { SponsoredProducts } from "@/components/sponsored/SponsoredProducts";

export default function SponsoredSlot() {
  return (
    <SponsoredProducts
      limit={3}
      title="Sponsorisés (slot parallèle)"
      delayMs={2500}
    />
  );
}
