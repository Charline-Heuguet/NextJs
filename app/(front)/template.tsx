import { Suspense } from "react";
import { PageTransition } from "./PageTransition";

export default function FrontTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={children}>
      <PageTransition>{children}</PageTransition>
    </Suspense>
  );
}
