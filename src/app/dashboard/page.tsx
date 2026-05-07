import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bot,
  Cpu,
  Database,
  Eye,
  Lock,
  Network,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RiskGauge } from "@/components/dashboard/risk-gauge";
import { RiskTrendChart } from "@/components/dashboard/risk-trend-chart";
import { RiskRadar } from "@/components/dashboard/risk-radar";
import { SeverityPie } from "@/components/dashboard/severity-pie";
import { ThreatHeatmap } from "@/components/dashboard/threat-heatmap";
import { CategoryTrend } from "@/components/dashboard/category-trend";
import { PostureTimeline } from "@/components/dashboard/posture-timeline";
import { ThreatFeed } from "@/components/dashboard/threat-feed";
import { RecentScans } from "@/components/dashboard/recent-scans";
import { InferenceTraffic } from "@/components/dashboard/inference-traffic";
import { SectionHeader } from "@/components/dashboard/section-header";
import { KPI_SCORES, MITRE_TACTICS } from "@/lib/mock-data";

const KPIS = [
  {
    label: "Overall AI Risk",
    value: KPI_SCORES.overallRisk,
    delta: -8,
    icon: ShieldAlert,
    tone: "rose" as const,
    description: "Composite risk across all assets"
  },
  {
    label: "Compliance",
    value: `${KPI_SCORES.compliance}%`,
    delta: 4,
    icon: BadgeCheck,
    tone: "emerald" as const,
    description: "SOC2 · GDPR · HIPAA · ISO"
  },
  {
    label: "Model Safety",
    value: KPI_SCORES.modelSafety,
    delta: 6,
    icon: Cpu,
    tone: "violet" as const,
    description: "8 models monitored"
  },
  {
    label: "Prompt Injection",
    value: KPI_SCORES.promptInjection,
    delta: -12,
    icon: Zap,
    tone: "amber" as const,
    description: "Down 12% week-over-week"
  },
  {
    label: "Data Leakage",
    value: KPI_SCORES.dataLeakage,
    delta: -3,
    icon: Database,
    tone: "rose" as const,
    description: "PII risk in 3 corpora"
  },
  {
    label: "Hallucination",
    value: KPI_SCORES.hallucination,
    delta: -5,
    icon: Bot,
    tone: "violet" as const,
    description: "Per 1k completions"
  },
  {
    label: "Jailbreak Exposure",
    value: KPI_SCORES.jailbreak,
    delta: -7,
    icon: Lock,
    tone: "amber" as const,
    description: "11/100 probes succeeded"
  },
  {
    label: "API Vulnerability",
    value: KPI_SCORES.apiVulnerability,
    delta: -2,
    icon: Network,
    tone: "cyan" as const,
    description: "Inference + control plane"
  },
  {
    label: "Tool Permission",
    value: KPI_SCORES.toolPermission,
    delta: -4,
    icon: Workflow,
    tone: "rose" as const,
    description: "Excessive scopes detected"
  },
  {
    label: "Monitoring Coverage",
    value: `${KPI_SCORES.monitoring}%`,
    delta: 3,
    icon: Eye,
    tone: "emerald" as const,
    description: "Across runtime + tools"
  }
];

export default function DashboardPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Mission Control"
        title="AI Security Overview"
        description="Real-time posture across every AI agent, model, RAG pipeline, MCP tool, and API in your enterprise."
        action={
          <>
            <Badge variant="cyber" className="hidden sm:inline-flex">
              <Sparkles className="h-3 w-3" />
              Live · 2,418 signals/min
            </Badge>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4" />
              Last 24h
            </Button>
            <Button size="sm">
              <ShieldCheck className="h-4 w-4" />
              Run new scan
            </Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {KPIS.map((k, i) => (
          <KpiCard key={k.label} {...k} index={i} />
        ))}
      </div>

      {/* Top row: gauge + trend + radar */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-3 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Posture Score
          </p>
          <RiskGauge score={86} label="A- · Strong" size={220} />
          <div className="mt-4 grid grid-cols-2 gap-3 w-full text-center">
            <div className="rounded-lg border border-border/40 bg-background/40 p-2">
              <div className="text-[10px] text-muted-foreground">Industry</div>
              <div className="font-mono font-semibold text-cyan-400">71</div>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/40 p-2">
              <div className="text-[10px] text-muted-foreground">Top Q.</div>
              <div className="font-mono font-semibold text-emerald-400">91</div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Trend & Attack Volume</CardTitle>
              <Badge variant="outline">12 months</Badge>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <RiskTrendChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Posture Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskRadar />
          </CardContent>
        </Card>
      </div>

      {/* Mid row: severity pie + heatmap + traffic */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SeverityPie />
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Heatmap by Asset Class</CardTitle>
              <Badge variant="outline">live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ThreatHeatmap />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Inference Traffic</CardTitle>
            <p className="text-xs text-muted-foreground">
              Last 24 hours · violet inbound, rose blocked
            </p>
          </CardHeader>
          <CardContent className="pb-2">
            <InferenceTraffic />
            <div className="mt-2 grid grid-cols-3 text-xs">
              <div>
                <div className="text-muted-foreground text-[10px]">Total</div>
                <div className="font-mono font-semibold">28.4M</div>
              </div>
              <div>
                <div className="text-muted-foreground text-[10px]">Blocked</div>
                <div className="font-mono font-semibold text-rose-400">
                  1,284
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-[10px]">P95</div>
                <div className="font-mono font-semibold">218ms</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: trend bars + threat feed + recent scans */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-6">
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

        <Card className="lg:col-span-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Threat Feed</CardTitle>
              <Badge variant="critical" className="animate-pulse">
                live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ThreatFeed />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Security Scans</CardTitle>
              <Button variant="outline" size="sm">
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <RecentScans />
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Posture vs Industry Baseline</CardTitle>
            <p className="text-xs text-muted-foreground">
              Quarterly improvements over the past 18 months
            </p>
          </CardHeader>
          <CardContent>
            <PostureTimeline />
          </CardContent>
        </Card>
      </div>

      {/* MITRE-style tactics row */}
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Adversary Tactics (MITRE ATLAS-aligned)</CardTitle>
            <Badge variant="outline">last 30 days</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {MITRE_TACTICS.map((t) => (
              <div
                key={t.tactic}
                className="rounded-xl border border-border/50 bg-background/30 p-4 hover:bg-background/60 transition-colors"
              >
                <div
                  className="h-1 rounded-full mb-3"
                  style={{ backgroundColor: t.color, opacity: 0.8 }}
                />
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground line-clamp-1">
                  {t.tactic}
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <div className="text-2xl font-bold font-mono">{t.count}</div>
                  <AlertTriangle
                    className="h-4 w-4"
                    style={{ color: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
