import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-lavender-100">Dashboard</h1>
      <p className="mt-2 text-slate-400">
        Bienvenue dans l&apos;espace d&apos;administration.
      </p>

      <Link
        href="/admin/products"
        className="mt-8 inline-flex rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 transition hover:border-rose-400 hover:text-rose-300"
      >
        Gérer les produits →
      </Link>
    </div>
  );
}
