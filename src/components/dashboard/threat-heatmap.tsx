"use client";

import { motion } from "framer-motion";
import { HEATMAP_DATA } from "@/lib/mock-data";

const SEVERITIES = ["critical", "high", "medium", "low"] as const;
const COLORS: Record<string, string> = {
  critical: "239,68,68",
  high: "249,115,22",
  medium: "245,158,11",
  low: "34,211,238"
};

export function ThreatHeatmap() {
  const max = Math.max(
    ...HEATMAP_DATA.flatMap((d) => SEVERITIES.map((s) => d[s] as number))
  );

  return (
    <div className="overflow-hidden">
      <table className="w-full border-separate border-spacing-1.5 text-xs">
        <thead>
          <tr className="text-muted-foreground">
            <th className="text-left font-medium px-2 py-1.5">Asset Class</th>
            {SEVERITIES.map((s) => (
              <th
                key={s}
                className="capitalize text-center font-medium px-2 py-1.5"
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HEATMAP_DATA.map((row, i) => (
            <tr key={row.category}>
              <td className="font-medium text-foreground px-2 py-1.5">
                {row.category}
              </td>
              {SEVERITIES.map((s, j) => {
                const v = row[s] as number;
                const intensity = Math.max(0.15, v / max);
                return (
                  <td key={s} className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.04 + j * 0.05
                      }}
                      className="rounded-md px-3 py-2 font-mono font-semibold border"
                      style={{
                        background: `rgba(${COLORS[s]}, ${intensity * 0.32})`,
                        borderColor: `rgba(${COLORS[s]}, ${intensity * 0.55})`,
                        color: `rgb(${COLORS[s]})`
                      }}
                    >
                      {v}
                    </motion.div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
