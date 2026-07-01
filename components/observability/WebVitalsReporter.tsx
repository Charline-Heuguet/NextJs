"use client";

import { useReportWebVitals } from "next/web-vitals";

type VitalLog = {
  name: string;
  value: number;
  rating: string;
  id: string;
  delta: number;
  navigationType: string;
};

const logs: VitalLog[] = [];

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const entry: VitalLog = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
    };

    logs.push(entry);
    console.info("[Web Vitals]", entry);

    if (logs.length >= 3) {
      const worst = [...logs].sort((a, b) => b.value - a.value)[0];
      console.info(
        "[Web Vitals] Métrique la plus impactante pour l'instant:",
        worst.name,
        `(${worst.value.toFixed(2)}, rating: ${worst.rating})`,
      );
    }
  });

  return null;
}
