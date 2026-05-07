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
import { INFERENCE_TRAFFIC } from "@/lib/mock-data";

export function InferenceTraffic() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart
        data={INFERENCE_TRAFFIC}
        margin={{ top: 5, right: 0, left: -28, bottom: 0 }}
      >
        <defs>
          <linearGradient id="inboundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis
          dataKey="hour"
          stroke="rgba(148,163,184,0.6)"
          fontSize={10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 12,
            color: "white",
            fontSize: 12
          }}
        />
        <Area
          type="monotone"
          dataKey="inbound"
          stroke="#a78bfa"
          strokeWidth={2}
          fill="url(#inboundGrad)"
        />
        <Area
          type="monotone"
          dataKey="blocked"
          stroke="#f43f5e"
          strokeWidth={2}
          fill="url(#blockedGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
