export async function simulateSlowFetch(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function logRenderTiming(label: string, start: number): void {
  console.log(`[render] ${label} ${(performance.now() - start).toFixed(0)}ms`);
}
