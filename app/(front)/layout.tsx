import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

function HeaderFallback() {
  return (
    <header className="border-b border-lavender-200 bg-lavender-50/80 dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto h-16 max-w-6xl animate-pulse px-6" />
    </header>
  );
}

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main className="flex flex-1 flex-col">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
