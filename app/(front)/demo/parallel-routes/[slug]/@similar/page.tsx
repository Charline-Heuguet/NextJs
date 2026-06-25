import { SimilarProducts } from "@/components/catalog/SimilarProducts";

export default async function SimilarSlot(
  props: PageProps<"/demo/parallel-routes/[slug]">,
) {
  const { slug } = await props.params;
  return <SimilarProducts slug={slug} delayMs={2000} />;
}
