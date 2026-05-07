"use client";

import { motion } from "framer-motion";

/**
 * Lightweight, hand-drawn dependency graph showing how an agent's
 * tools, retrievers, and downstream services are wired.
 */
const NODES = [
  { id: "agent", label: "Atlas Agent", x: 50, y: 50, tone: "violet", root: true },
  { id: "planner", label: "Planner LLM", x: 22, y: 28, tone: "fuchsia" },
  { id: "rag", label: "Compliance RAG", x: 22, y: 72, tone: "cyan" },
  { id: "stripe", label: "Stripe MCP", x: 78, y: 22, tone: "amber" },
  { id: "github", label: "GitHub MCP", x: 78, y: 50, tone: "emerald" },
  { id: "egress", label: "Egress Proxy", x: 78, y: 78, tone: "rose" }
] as const;

const EDGES = [
  ["agent", "planner"],
  ["agent", "rag"],
  ["agent", "stripe"],
  ["agent", "github"],
  ["stripe", "egress"],
  ["github", "egress"]
];

const TONE: Record<string, string> = {
  violet: "from-violet-500 to-fuchsia-500",
  fuchsia: "from-fuchsia-500 to-pink-500",
  cyan: "from-cyan-400 to-sky-500",
  amber: "from-amber-400 to-orange-500",
  emerald: "from-emerald-500 to-teal-500",
  rose: "from-rose-500 to-orange-500"
};

const STROKE: Record<string, string> = {
  violet: "rgb(167,139,250)",
  fuchsia: "rgb(232,121,249)",
  cyan: "rgb(34,211,238)",
  amber: "rgb(251,191,36)",
  emerald: "rgb(16,185,129)",
  rose: "rgb(244,63,94)"
};

export function DependencyGraph() {
  const find = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div className="relative aspect-[16/9] rounded-xl border border-border/40 bg-background/30 overflow-hidden">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {EDGES.map(([a, b], i) => {
          const A = find(a);
          const B = find(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={STROKE[B.tone]}
              strokeOpacity={0.45}
              strokeWidth={0.4}
              strokeDasharray="1.2 1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
          );
        })}
      </svg>
      {NODES.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className={`rounded-xl border border-border/40 bg-slate-950/80 backdrop-blur px-3 py-2 text-[11px] font-medium shadow-lg ${
              n.root ? "ring-2 ring-violet-500/40" : ""
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${TONE[n.tone]}`}
              />
              {n.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
