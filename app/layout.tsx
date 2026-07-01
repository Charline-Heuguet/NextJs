import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { WebVitalsReporter } from "@/components/observability/WebVitalsReporter";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontDisplay = localFont({
  src: "./fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "My supa store",
    template: "%s · My supa store",
  },
  description: "Boutique en ligne : découvrez nos produits",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "My supa store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <WebVitalsReporter />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
