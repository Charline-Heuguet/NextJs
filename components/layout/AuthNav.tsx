import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/app/actions/auth";

export async function AuthNav() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Link
          href="/login"
          className="font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-300"
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-rose-500 px-3 py-1.5 font-medium text-white transition hover:bg-rose-600"
        >
          Inscription
        </Link>
      </div>
    );
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <Link
          href="/admin"
          className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-300"
        >
          Admin
        </Link>
      )}
      <Link
        href="/account"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-200 text-xs font-bold text-lavender-900 dark:bg-slate-700 dark:text-lavender-100"
        title={session.user.name ?? session.user.email ?? "Mon compte"}
      >
        {session.user.trigram}
      </Link>
      <form action={logout}>
        <button
          type="submit"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-300"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}
