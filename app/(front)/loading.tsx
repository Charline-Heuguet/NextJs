export default function FrontLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <section className="mb-12 text-center">
        <div className="mx-auto h-10 w-64 animate-pulse rounded bg-lavender-200 dark:bg-slate-700 sm:w-80" />
        <div className="mx-auto mt-4 h-5 max-w-2xl animate-pulse rounded bg-lavender-200 dark:bg-slate-700" />
      </section>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-2xl border border-lavender-200 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="aspect-square bg-lavender-100 dark:bg-slate-800" />
            <div className="p-5">
              <div className="h-4 w-1/3 rounded bg-lavender-200 dark:bg-slate-700" />
              <div className="mt-3 h-5 w-3/4 rounded bg-lavender-200 dark:bg-slate-700" />
              <div className="mt-2 h-4 w-full rounded bg-lavender-200 dark:bg-slate-700" />
              <div className="mt-4 h-6 w-1/4 rounded bg-lavender-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
