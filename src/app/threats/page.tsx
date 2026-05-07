"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Globe2,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Sparkles
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
import { ThreatFeed } from "@/components/dashboard/threat-feed";
import { CategoryTrend } from "@/components/dashboard/category-trend";
import { THREAT_FEED } from "@/lib/mock-data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const FORECAST = [
  { d: "Today", actual: 312, forecast: 312 },
  { d: "+1d", actual: null, forecast: 348 },
  { d: "+2d", actual: null, forecast: 362 },
  { d: "+3d", actual: null, forecast: 401 },
  { d: "+4d", actual: null, forecast: 388 },
  { d: "+5d", actual: null, forecast: 442 },
  { d: "+6d", actual: null, forecast: 471 },
  { d: "+7d", actual: null, forecast: 488 }
];

const HOTSPOTS = [
  { country: "🇺🇸 United States", attacks: 2840, blocked: 99.4 },
  { country: "🇩🇪 Germany", attacks: 1620, blocked: 98.1 },
  { country: "🇬🇧 United Kingdom", attacks: 1190, blocked: 99.2 },
  { country: "🇧🇷 Brazil", attacks: 980, blocked: 96.7 },
  { country: "🇮🇳 India", attacks: 870, blocked: 98.9 },
  { country: "🇷🇺 Russia", attacks: 740, blocked: 92.3 },
  { country: "🇨🇳 China", attacks: 612, blocked: 91.5 },
  { country: "🇫🇷 France", attacks: 581, blocked: 99.6 }
];

const NEW_TTPS = [
  {
    title: "JSON-Schema confusion injection",
    severity: "critical",
    days: "fresh"
  },
  { title: "MCP tool drift via stale manifest", severity: "high", days: "2d" },
  { title: "Vector store collision attack", severity: "high", days: "5d" },
  {
    title: "Reflection-based jailbreak chain",
    severity: "medium",
    days: "1w"
  },
  { title: "LangChain agent path traversal CVE", severity: "high", days: "1w" }
];

export default function ThreatsPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Threat intelligence"
        title="Live AI Threat Intelligence"
        description="Real-time detections, geographic hotspots, emerging TTPs, and AI-driven forecasting."
        action={
          <>
            <Badge variant="critical" className="animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
              live · 6 events/min
            </Badge>
            <Button variant="cyber" size="sm">
              <Sparkles className="h-4 w-4" />
              Subscribe to feed
            </Button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            l: "Threats Today",
            v: "1,284",
            d: "+24% WoW",
            tone: "violet",
            icon: ShieldAlert
          },
          {
            l: "Blocked",
            v: "99.1%",
            d: "Above SLA",
            tone: "emerald",
            icon: ShieldCheck
          },
          {
            l: "MTTD",
            v: "3.2s",
            d: "Down from 11s",
            tone: "cyan",
            icon: Activity
          },
          {
            l: "Active TTPs",
            v: "37",
            d: "5 new this week",
            tone: "rose",
            icon: Radar
          }
        ].map((s, i) => {
          const Icon = s.icon;
          const ringClass =
            s.tone === "violet"
              ? "from-violet-500/30 to-fuchsia-500/10"
              : s.tone === "emerald"
              ? "from-emerald-500/30 to-teal-500/10"
              : s.tone === "cyan"
              ? "from-cyan-500/30 to-sky-500/10"
              : "from-rose-500/30 to-pink-500/10";
          const iconClass =
            s.tone === "violet"
              ? "text-violet-300"
              : s.tone === "emerald"
              ? "text-emerald-300"
              : s.tone === "cyan"
              ? "text-cyan-300"
              : "text-rose-300";
          return (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 relative overflow-hidden">
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${ringClass}`}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.l}
                    </p>
                    <p className="text-3xl font-bold font-mono mt-1">{s.v}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {s.d}
                    </p>
                  </div>
                  <Icon className={`h-5 w-5 ${iconClass}`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Detections</CardTitle>
              <Badge variant="outline">{THREAT_FEED.length} events</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ThreatFeed />
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>7-day Risk Forecast</CardTitle>
            <p className="text-xs text-muted-foreground">
              Bayesian forecast with 90% confidence band
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={FORECAST}
                margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.12)"
                />
                <XAxis
                  dataKey="d"
                  stroke="rgba(148,163,184,0.7)"
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="rgba(148,163,184,0.7)"
                  fontSize={11}
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
                />
                <Line
                  dataKey="forecast"
                  type="monotone"
                  stroke="#a78bfa"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: "#a78bfa" }}
                />
                <Line
                  dataKey="actual"
                  type="monotone"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#22d3ee" }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-2 text-xs text-muted-foreground">
              Forecast suggests ~56% increase in jailbreak attempts over next 7
              days, driven by emerging persona-injection campaign.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Geographic Hotspots</CardTitle>
            <p className="text-xs text-muted-foreground">
              Top originating regions, last 24 hours
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {HOTSPOTS.map((h, i) => (
              <motion.div
                key={h.country}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 px-3 py-2"
              >
                <Globe2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm flex-1">{h.country}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {h.attacks.toLocaleString()}
                </span>
                <Badge variant="success" className="font-mono">
                  {h.blocked}%
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Categories Over Time</CardTitle>
              <Badge variant="outline">7 weeks</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CategoryTrend />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Emerging TTPs</CardTitle>
            <Badge variant="cyber">curated by Sentinel Labs</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {NEW_TTPS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border/40 bg-background/30 p-4"
            >
              <div className="flex items-center justify-between">
                <Badge variant={t.severity as never}>{t.severity}</Badge>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {t.days}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold">{t.title}</h3>
              <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                <Sparkles className="h-3.5 w-3.5" /> Add to scan profile
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
