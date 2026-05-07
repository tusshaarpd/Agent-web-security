"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { SEVERITY_DISTRIBUTION } from "@/lib/mock-data";

export function SeverityPie() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={SEVERITY_DISTRIBUTION}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
          stroke="rgba(2,6,23,0.6)"
          strokeWidth={2}
        >
          {SEVERITY_DISTRIBUTION.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 12,
            color: "white",
            fontSize: 12
          }}
        />
        <Legend
          iconType="circle"
          formatter={(v: string) => (
            <span className="text-xs text-muted-foreground">{v}</span>
          )}
          wrapperStyle={{ fontSize: 11 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
