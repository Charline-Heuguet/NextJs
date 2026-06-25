export default function SimilarSlotLoading() {
  return (
    <section>
      <div className="mb-4 h-7 w-40 animate-pulse rounded-lg bg-lavender-100 dark:bg-slate-800" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-xl bg-lavender-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </section>
  );
}
