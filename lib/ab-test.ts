export const AB_PREFETCH_COOKIE = "ab_prefetch";
export type AbPrefetchVariant = "A" | "B";

export function parseAbPrefetchVariant(
  value: string | undefined | null,
): AbPrefetchVariant | null {
  if (value === "A" || value === "B") return value;
  return null;
}

export function pickRandomAbVariant(): AbPrefetchVariant {
  return Math.random() < 0.5 ? "A" : "B";
}

export function getTrigram(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().slice(0, 2);
  return `${first}${last}`.toUpperCase().padEnd(3, "X");
}
