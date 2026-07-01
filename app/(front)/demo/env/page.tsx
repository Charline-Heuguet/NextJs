"use client";

import { useEffect, useState } from "react";

type ServerEnvResponse = {
  publicSiteName: string | null;
  storeRegion: string;
  note: string;
};

export default function EnvDemoPage() {
  const publicName = process.env.NEXT_PUBLIC_SITE_NAME ?? "(non définie)";
  const [serverData, setServerData] = useState<ServerEnvResponse | null>(null);

  useEffect(() => {
    void fetch("/api/server-env")
      .then((response) => response.json())
      .then((data: ServerEnvResponse) => setServerData(data));
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Variables d&apos;environnement
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Comparaison entre variable publique (client) et variable serveur (API).
      </p>

      <section className="mt-8 rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
          Côté client (NEXT_PUBLIC_*)
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Inlinée au build, visible dans le bundle navigateur.
        </p>
        <code className="mt-3 block rounded-lg bg-lavender-50 px-3 py-2 text-sm dark:bg-slate-800">
          NEXT_PUBLIC_SITE_NAME = {publicName}
        </code>
      </section>

      <section className="mt-6 rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
          Côté serveur (route /api/server-env)
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Accessible uniquement via une route server-side.
        </p>
        {serverData ? (
          <pre className="mt-3 overflow-x-auto rounded-lg bg-lavender-50 p-3 text-sm dark:bg-slate-800">
            {JSON.stringify(serverData, null, 2)}
          </pre>
        ) : (
          <p className="mt-3 text-sm text-slate-500">Chargement…</p>
        )}
      </section>
    </div>
  );
}
