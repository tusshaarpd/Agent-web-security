"use client";

import { motion } from "framer-motion";
import { Activity, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Animated, marketing-grade dashboard preview shown on the landing page.
 * Decoupled from the real /dashboard page so it can be styled freely.
 */
export function PreviewMock() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl opacity-60" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-500/70" />
          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
          <div className="ml-3 text-xs font-mono text-slate-400">
            sentinel.ai/dashboard
          </div>
          <Badge variant="cyber" className="ml-auto">
            Live
          </Badge>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 p-5">
          {/* KPI Row */}
          <div className="col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Risk",
                v: "72",
                icon: ShieldAlert,
                color: "text-rose-400",
                ring: "from-rose-500/40 to-orange-500/10"
              },
              {
                label: "Compliance",
                v: "86",
                icon: Sparkles,
                color: "text-emerald-400",
                ring: "from-emerald-500/40 to-cyan-500/10"
              },
              {
                label: "Threats",
                v: "1,284",
                icon: Activity,
                color: "text-violet-400",
                ring: "from-violet-500/40 to-fuchsia-500/10"
              },
              {
                label: "Coverage",
                v: "92%",
                icon: Zap,
                color: "text-cyan-400",
                ring: "from-cyan-500/40 to-sky-500/10"
              }
            ].map((k, i) => {
              const Icon = k.icon;
              return (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="relative rounded-xl border border-white/10 bg-white/[0.02] p-3 overflow-hidden"
                >
                  <div
                    className={`absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl bg-gradient-to-br ${k.ring} opacity-70`}
                  />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400">
                        {k.label}
                      </div>
                      <div className="text-2xl font-bold mt-1 font-mono text-white">
                        {k.v}
                      </div>
                    </div>
                    <Icon className={`h-4 w-4 ${k.color}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Chart bars */}
          <div className="col-span-12 lg:col-span-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-white">
                Threat Velocity
              </div>
              <Badge variant="cyber">Last 7 days</Badge>
            </div>
            <div className="h-40 flex items-end gap-2">
              {[42, 58, 36, 71, 49, 65, 82, 53, 67, 78, 45, 70, 88, 92].map(
                (v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${v}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.04,
                      ease: "easeOut"
                    }}
                    className="flex-1 rounded-md bg-gradient-to-t from-violet-500/70 via-fuchsia-500/60 to-cyan-400/70"
                  />
                )
              )}
            </div>
          </div>

          {/* Side feed */}
          <div className="col-span-12 lg:col-span-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold mb-3 text-white">
              Live Detections
            </div>
            <div className="space-y-2">
              {[
                {
                  c: "Prompt Injection",
                  s: "critical",
                  t: "Atlas Agent · 2s"
                },
                { c: "Tool Misuse", s: "high", t: "Helios · 18s" },
                { c: "RAG Poisoning", s: "high", t: "Compliance RAG · 41s" },
                {
                  c: "Cost DoS",
                  s: "medium",
                  t: "Inference Gateway · 1m"
                }
              ].map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        d.s === "critical"
                          ? "bg-rose-400 animate-pulse"
                          : d.s === "high"
                          ? "bg-orange-400"
                          : "bg-amber-400"
                      }`}
                    />
                    {d.c}
                  </div>
                  <div className="text-[10px] text-slate-500">{d.t}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
