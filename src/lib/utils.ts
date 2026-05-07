import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combine Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with thousand separators (e.g. 12,345). */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Map a 0-100 score to a semantic severity bucket. */
export function severityFromScore(score: number) {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  if (score >= 20) return "low";
  return "info";
}

/** Color tokens used across charts and KPI widgets. */
export const SEVERITY_COLORS: Record<string, string> = {
  critical: "#f43f5e",
  high: "#f97316",
  medium: "#f59e0b",
  low: "#22d3ee",
  info: "#10b981"
};

/** Convert a Date or ISO string into a short, readable label. */
export function formatDate(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

/** Compose a relative time label (e.g. "12m ago"). */
export function relativeTime(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
