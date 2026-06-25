import Link from "next/link";
import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("max");

  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-lavender-200 bg-lavender-50 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {year} My supa store. Tous droits réservés.
        </p>

        <nav aria-label="Navigation pied de page" className="flex gap-4">
          <Link
            href="/sponsored"
            className="text-sm text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-300"
          >
            Sponsorisés
          </Link>
          <Link
            href="/admin"
            className="text-sm text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-300"
          >
            Administration
          </Link>
        </nav>
      </div>
    </footer>
  );
}
