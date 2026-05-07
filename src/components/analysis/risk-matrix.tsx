"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";
import { FINDINGS } from "@/lib/mock-data";

const SEV_TO_Y: Record<string, number> = {
  critical: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1
};

const SEV_COLORS: Record<string, string> = {
  critical: "#f43f5e",
  high: "#f97316",
  medium: "#f59e0b",
  low: "#22d3ee",
  info: "#10b981"
};

export function RiskMatrix() {
  const data = FINDINGS.map((f) => ({
    confidence: f.confidence,
    severity: SEV_TO_Y[f.severity],
    label: f.title,
    sev: f.severity,
    z: 200
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 10, right: 10, bottom: 5, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
        <XAxis
          type="number"
          dataKey="confidence"
          name="Confidence"
          unit="%"
          stroke="rgba(148,163,184,0.7)"
          fontSize={11}
          domain={[40, 100]}
        />
        <YAxis
          type="number"
          dataKey="severity"
          name="Severity"
          stroke="rgba(148,163,184,0.7)"
          fontSize={11}
          domain={[0, 5]}
          tickFormatter={(v) =>
            ["", "Info", "Low", "Med", "High", "Crit"][v as number] || ""
          }
        />
        <ZAxis dataKey="z" range={[120, 400]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 12,
            color: "white",
            fontSize: 12
          }}
          formatter={(v: number, name: string) =>
            name === "Severity"
              ? ["—", "Info", "Low", "Med", "High", "Crit"][v]
              : v
          }
          labelFormatter={() => ""}
        />
        <Scatter data={data}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={SEV_COLORS[d.sev]}
              fillOpacity={0.65}
              stroke={SEV_COLORS[d.sev]}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function RiskMatrixLegend() {
  return (
    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-rose-500" /> Critical
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-orange-500" /> High
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-cyan-400" /> Low
      </span>
    </div>
  );
}
