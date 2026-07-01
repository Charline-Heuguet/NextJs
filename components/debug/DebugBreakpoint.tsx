"use client";

export function DebugBreakpoint() {
  function handleClick() {
    debugger;
    console.info("[Debug] Point d'arrêt client atteint.");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border border-lavender-200 px-5 py-2 text-sm font-medium text-lavender-900 transition hover:border-rose-300 dark:border-slate-700 dark:text-lavender-100"
    >
      Déclencher debugger (front)
    </button>
  );
}
