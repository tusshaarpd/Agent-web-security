"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { RISK_TREND } from "@/lib/mock-data";

export function RiskTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={RISK_TREND}
        margin={{ top: 10, right: 10, bottom: 0, left: -16 }}
      >
        <defs>
          <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="attackFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
        <XAxis
          dataKey="date"
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
            fontSize: 12,
            backdropFilter: "blur(12px)"
          }}
        />
        <Area
          type="monotone"
          dataKey="risk"
          name="Risk Score"
          stroke="#a78bfa"
          strokeWidth={2}
          fill="url(#riskFill)"
        />
        <Area
          type="monotone"
          dataKey="blocked"
          name="Blocked Attacks"
          stroke="#22d3ee"
          strokeWidth={2}
          fill="url(#attackFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
