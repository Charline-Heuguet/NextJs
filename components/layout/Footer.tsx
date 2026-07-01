import Link from "next/link";
import { connection } from "next/server";
import { getLocale, translate } from "@/lib/i18n/server";

export async function Footer() {
  await connection();
  const locale = await getLocale();
  const rights = translate(locale, "footer.rights");
  const sponsored = translate(locale, "footer.sponsored");
  const admin = translate(locale, "footer.admin");
  const year = new Date().getFullYear();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "My supa store";

  return (
    <footer className="mt-auto border-t border-lavender-200 bg-lavender-50 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {year} {siteName}. {rights}
        </p>

        <nav aria-label="Navigation pied de page" className="flex gap-4">
          <Link
            href="/sponsored"
            className="text-sm text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-300"
          >
            {sponsored}
          </Link>
          <Link
            href="/admin"
            className="text-sm text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-300"
          >
            {admin}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
