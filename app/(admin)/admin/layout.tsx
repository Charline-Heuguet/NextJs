import Link from "next/link";

export const metadata = {
  title: "Admin",
  description: "Espace d'administration My supa store",
};

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Produits" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full bg-slate-900 text-slate-100">
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-700 bg-slate-950">
        <div className="border-b border-slate-700 px-4 py-5">
          <Link
            href="/admin"
            className="text-lg font-semibold tracking-tight text-lavender-100"
          >
            Admin
          </Link>
          <p className="mt-0.5 text-xs text-slate-400">My supa store</p>
        </div>

        <nav className="flex-1 space-y-0.5 p-3" aria-label="Navigation admin">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-lavender-100"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-700 p-3">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-800 hover:text-rose-300"
          >
            ← Retour au site
          </Link>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
