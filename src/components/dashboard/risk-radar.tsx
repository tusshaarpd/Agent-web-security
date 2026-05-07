"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { RADAR_PROFILE } from "@/lib/mock-data";

export function RiskRadar() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={RADAR_PROFILE} outerRadius="78%">
        <PolarGrid stroke="rgba(148,163,184,0.18)" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "rgba(148,163,184,0.85)", fontSize: 11 }}
        />
        <PolarRadiusAxis
          stroke="rgba(148,163,184,0.18)"
          tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 9 }}
          angle={30}
          domain={[0, 100]}
        />
        <Radar
          name="Posture"
          dataKey="score"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.35}
          strokeWidth={2}
        />
        <Radar
          name="Industry Baseline"
          dataKey="baseline"
          stroke="#22d3ee"
          fill="#22d3ee"
          fillOpacity={0.15}
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
        <Tooltip
          contentStyle={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 12,
            color: "white",
            fontSize: 12
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
