"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Bug,
  Crosshair,
  Layers,
  Loader2,
  Play,
  RefreshCw,
  Shield,
  ShieldAlert,
  Sparkles,
  Zap
} from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AttackFlow } from "@/components/analysis/attack-flow";
import { Progress } from "@/components/ui/progress";
import { ASSETS, BENCHMARK } from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

const SCENARIOS = [
  {
    id: "injection",
    name: "Indirect Prompt Injection",
    icon: Crosshair,
    description: "Hidden instructions in retrieved or uploaded content",
    risk: "critical"
  },
  {
    id: "tool",
    name: "Tool Capability Abuse",
    icon: Layers,
    description: "Adversary chains MCP tool calls to escalate scope",
    risk: "high"
  },
  {
    id: "rag",
    name: "RAG Poisoning",
    icon: Bug,
    description: "Adversary alters indexed corpus to manipulate answers",
    risk: "high"
  },
  {
    id: "jailbreak",
    name: "Multi-step Jailbreak",
    icon: Bot,
    description: "Persona injection chains to bypass safety policy",
    risk: "medium"
  }
];

export default function SimulationPage() {
  const [scenario, setScenario] = React.useState(SCENARIOS[0].id);
  const [target, setTarget] = React.useState(ASSETS[0].id);
  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const start = () => {
    setRunning(true);
    setDone(false);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setRunning(false);
          setDone(true);
          return 100;
        }
        return p + 4;
      });
    }, 160);
  };

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Threat simulation"
        title="Attack Simulation Studio"
        description="Replay adversarial scenarios in a sandbox. Observe how your guardrails react before the real adversary does."
        action={
          <>
            <Badge variant="cyber">
              <Sparkles className="h-3 w-3" /> sandbox mode
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </>
        }
      />

      {/* Scenario picker */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SCENARIOS.map((s) => {
          const Icon = s.icon;
          const sel = scenario === s.id;
          return (
            <motion.button
              key={s.id}
              whileHover={{ y: -2 }}
              onClick={() => setScenario(s.id)}
              className={`text-left rounded-xl border p-5 transition-all ${
                sel
                  ? "border-violet-500/40 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 shadow-lg shadow-violet-500/10"
                  : "border-border/50 bg-card/40 hover:border-violet-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className={`h-5 w-5 ${
                    sel ? "text-violet-300" : "text-muted-foreground"
                  }`}
                />
                <Badge variant={s.risk as never}>{s.risk}</Badge>
              </div>
              <div className="mt-3 text-sm font-semibold">{s.name}</div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {s.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Configurator */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Configure simulation</CardTitle>
            <p className="text-xs text-muted-foreground">
              Choose a target asset and probe profile
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Target asset
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background/40 px-3 py-2 text-sm backdrop-blur"
              >
                {ASSETS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Probe corpus
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Sentinel Core", "OWASP LLM"].map((p, i) => (
                  <button
                    key={p}
                    className={`rounded-lg border px-3 py-2 text-xs ${
                      i === 0
                        ? "border-violet-500/40 bg-violet-500/10"
                        : "border-border/50 bg-background/30"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Intensity
              </label>
              <input
                type="range"
                min={1}
                max={10}
                defaultValue={6}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Light</span>
                <span>Standard</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-background/30 p-3 space-y-2 text-xs">
              <Row k="Estimated runtime" v="~6 min" />
              <Row k="Probes" v="240 prompts" />
              <Row k="Tools touched" v="8" />
              <Row k="Sandbox cost" v="$0.42" />
            </div>

            <Button
              className="w-full"
              onClick={start}
              disabled={running}
              size="lg"
            >
              {running ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Simulating · {progress}%
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Launch simulation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Replay */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attack Chain Replay</CardTitle>
              {done ? (
                <Badge variant="success">contained · 1 control fired</Badge>
              ) : running ? (
                <Badge variant="cyber">running</Badge>
              ) : (
                <Badge variant="outline">idle</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <AttackFlow />
            {(running || done) && (
              <div className="mt-5 rounded-xl border border-border/40 bg-background/30 p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium">Probe execution</span>
                  <span className="font-mono">{progress}%</span>
                </div>
                <Progress value={progress} />
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <Stat label="Probes fired" v={Math.round(progress * 2.4)} />
                  <Stat
                    label="Detections"
                    v={Math.round(progress / 6)}
                    tone="rose"
                  />
                  <Stat
                    label="Blocked"
                    v={Math.round(progress / 7)}
                    tone="emerald"
                  />
                  <Stat
                    label="Bypassed"
                    v={Math.max(0, Math.round(progress / 30))}
                    tone="amber"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comparison */}
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Posture Benchmark</CardTitle>
            <Badge variant="outline">peer comparison</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={BENCHMARK}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 60, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.12)"
              />
              <XAxis
                type="number"
                stroke="rgba(148,163,184,0.7)"
                fontSize={11}
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="peer"
                stroke="rgba(148,163,184,0.85)"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: 12,
                  color: "white",
                  fontSize: 12
                }}
                cursor={{ fill: "rgba(139,92,246,0.05)" }}
              />
              <Bar dataKey="overall" radius={[0, 8, 8, 0]}>
                {BENCHMARK.map((b) => (
                  <Cell key={b.peer} fill={b.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Multi-agent comparison */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Multi-agent Comparison</CardTitle>
          <p className="text-xs text-muted-foreground">
            Side-by-side risk profile across your top agents
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ASSETS.filter((a) => a.kind === "agent" || a.kind === "workflow")
              .slice(0, 3)
              .map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-border/40 bg-background/30 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate">
                      {a.name}
                    </span>
                    <Badge variant="outline">{a.kind}</Badge>
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    {[
                      { l: "Risk", v: a.riskScore, tone: "rose" },
                      { l: "Compliance", v: a.complianceScore, tone: "emerald" },
                      { l: "Coverage", v: 92, tone: "violet" }
                    ].map((m) => (
                      <div key={m.l}>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{m.l}</span>
                          <span className="font-mono">{m.v}</span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-muted/40 overflow-hidden">
                          <div
                            className={`h-full ${
                              m.tone === "rose"
                                ? "bg-gradient-to-r from-rose-500 to-orange-400"
                                : m.tone === "emerald"
                                ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                                : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            }`}
                            style={{ width: `${m.v}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-mono">{v}</span>
    </div>
  );
}

function Stat({
  label,
  v,
  tone = "violet"
}: {
  label: string;
  v: number;
  tone?: "violet" | "rose" | "emerald" | "amber";
}) {
  const c =
    tone === "rose"
      ? "text-rose-400"
      : tone === "emerald"
      ? "text-emerald-400"
      : tone === "amber"
      ? "text-amber-400"
      : "text-violet-300";
  return (
    <div className="rounded-md border border-border/40 bg-background/40 p-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={`mt-0.5 text-base font-bold font-mono ${c}`}>{v}</div>
    </div>
  );
}
