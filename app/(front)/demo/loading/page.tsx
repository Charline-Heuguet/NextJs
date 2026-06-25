export default async function DemoLoadingPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Chargement terminé
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Le skeleton de loading.tsx s&apos;est affiché pendant 2 secondes.
      </p>
    </div>
  );
}
