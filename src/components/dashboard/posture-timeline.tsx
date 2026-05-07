"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { POSTURE_TIMELINE } from "@/lib/mock-data";

export function PostureTimeline() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart
        data={POSTURE_TIMELINE}
        margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
        <XAxis
          dataKey="quarter"
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
          domain={[40, 100]}
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
        <Line
          dataKey="posture"
          type="monotone"
          stroke="#a78bfa"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#a78bfa" }}
          activeDot={{ r: 6, fill: "#fff", stroke: "#a78bfa", strokeWidth: 2 }}
        />
        <Line
          dataKey="baseline"
          type="monotone"
          stroke="#22d3ee"
          strokeWidth={1.8}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
