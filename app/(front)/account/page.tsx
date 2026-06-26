import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Espace personnel My supa store",
};

export default async function AccountPage() {
  await connection();
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Mon compte
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Page accessible uniquement aux utilisateurs authentifiés.
      </p>

      <div className="mt-8 rounded-2xl border border-lavender-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lavender-200 text-lg font-bold text-lavender-900 dark:bg-slate-700 dark:text-lavender-100">
            {session.user.trigram}
          </span>
          <div>
            <p className="text-lg font-semibold text-lavender-900 dark:text-lavender-100">
              {session.user.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {session.user.email}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
              Rôle : {session.user.role}
            </p>
          </div>
        </div>

        {session.user.role === "ADMIN" && (
          <Link
            href="/admin"
            className="mt-6 inline-flex rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
          >
            Accéder à l&apos;administration
          </Link>
        )}
      </div>
    </div>
  );
}
