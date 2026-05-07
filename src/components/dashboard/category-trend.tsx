"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { CATEGORY_TRENDS } from "@/lib/mock-data";

export function CategoryTrend() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={CATEGORY_TRENDS}
        margin={{ top: 5, right: 10, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
        <XAxis
          dataKey="week"
          stroke="rgba(148,163,184,0.7)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="rgba(148,163,184,0.7)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 12,
            color: "white",
            fontSize: 12
          }}
          cursor={{ fill: "rgba(139,92,246,0.08)" }}
        />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 11, paddingTop: 6 }}
          formatter={(v: string) => (
            <span className="text-xs text-muted-foreground capitalize">
              {v}
            </span>
          )}
        />
        <Bar
          dataKey="injection"
          stackId="a"
          fill="#f43f5e"
          radius={[0, 0, 0, 0]}
        />
        <Bar dataKey="leakage" stackId="a" fill="#f97316" />
        <Bar dataKey="jailbreak" stackId="a" fill="#8b5cf6" />
        <Bar
          dataKey="hallucination"
          stackId="a"
          fill="#22d3ee"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
