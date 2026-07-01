"use client";

export function SiteNameBanner() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "My supa store";

  return (
    <p className="hidden text-xs text-slate-400 sm:block" data-testid="site-name-banner">
      {siteName}
    </p>
  );
}
