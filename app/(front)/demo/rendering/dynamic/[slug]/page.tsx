import { Suspense } from "react";
import { DemoNav } from "@/app/(front)/demo/rendering/_shared";
import DynamicRenderingContent from "@/app/(front)/demo/rendering/dynamic/[slug]/DynamicRenderingContent";

export default async function DynamicRenderingDemo(
  props: PageProps<"/demo/rendering/dynamic/[slug]">,
) {
  const { slug } = await props.params;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <DemoNav current="dynamic" slug={slug} />
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-2xl bg-lavender-100 dark:bg-slate-800" />
        }
      >
        <DynamicRenderingContent slug={slug} />
      </Suspense>
    </div>
  );
}
