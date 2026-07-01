import { DebugBreakpoint } from "@/components/debug/DebugBreakpoint";

export default function DebugDemoPage() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-lavender-900 dark:text-lavender-100">
        Debug front et back
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Ouvrez les DevTools avant de cliquer. Pour le back :{" "}
        <code className="text-sm">NODE_OPTIONS=&apos;--inspect&apos; npm run dev</code>
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-lavender-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-semibold text-lavender-900 dark:text-lavender-100">
          Front (debugger)
        </h2>
        <DebugBreakpoint />
      </div>
    </div>
  );
}
