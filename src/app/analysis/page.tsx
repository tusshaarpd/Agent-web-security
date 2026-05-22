"use client";

import { Download, Filter, Sparkles } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FindingCard } from "@/components/analysis/finding-card";
import {
  RiskMatrix,
  RiskMatrixLegend
} from "@/components/analysis/risk-matrix";
import { AttackFlow } from "@/components/analysis/attack-flow";
import { DependencyGraph } from "@/components/analysis/dependency-graph";
import { RemediationChecklist } from "@/components/analysis/remediation-checklist";
import { MitreGrid } from "@/components/analysis/mitre-grid";
import { PostureTimeline } from "@/components/dashboard/posture-timeline";
import { FINDINGS } from "@/lib/mock-data";

export default function AnalysisPage() {
  const stats = {
    total: FINDINGS.length,
    critical: FINDINGS.filter((f) => f.severity === "critical").length,
    high: FINDINGS.filter((f) => f.severity === "high").length,
    medium: FINDINGS.filter((f) => f.severity === "medium").length,
    open: FINDINGS.filter((f) => f.status === "open").length
  };

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Detailed analysis"
        title="Findings & Posture"
        description="Every detection mapped to MITRE ATLAS, with explainable evidence, attack chains, and AI-generated remediation."
        action={
          <>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="cyber" size="sm">
              <Sparkles className="h-4 w-4" />
              AI Triage
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </>
        }
      />

      {/* Top stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Total findings
          </div>
          <div className="mt-1 text-2xl font-bold font-mono">{stats.total}</div>
        </Card>
        <Card className="p-4 border-rose-500/30">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Critical
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-400">
            {stats.critical}
          </div>
        </Card>
        <Card className="p-4 border-orange-500/30">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            High
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-orange-400">
            {stats.high}
          </div>
        </Card>
        <Card className="p-4 border-amber-500/30">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Medium
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-400">
            {stats.medium}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Open
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-violet-300">
            {stats.open}
          </div>
        </Card>
      </div>

      {/* Top row: matrix + posture */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Prioritization Matrix</CardTitle>
              <Badge variant="outline">Severity × Confidence</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <RiskMatrix />
            <RiskMatrixLegend />
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Security Posture Timeline</CardTitle>
            <p className="text-xs text-muted-foreground">
              Posture vs industry baseline · 6 quarters
            </p>
          </CardHeader>
          <CardContent>
            <PostureTimeline />
          </CardContent>
        </Card>
      </div>

      {/* Attack chain replay */}
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attack Chain Replay — INC-2024-09-114</CardTitle>
            <div className="flex gap-2">
              <Badge variant="critical" className="animate-pulse">
                replaying
              </Badge>
              <Button variant="cyber" size="sm">
                <Sparkles className="h-4 w-4" />
                Simulate fix
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AttackFlow />
        </CardContent>
      </Card>

      {/* Dep graph + MITRE */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Dependency Graph — Atlas Agent</CardTitle>
            <p className="text-xs text-muted-foreground">
              Agents, planners, MCP tools, retrievers, and egress
            </p>
          </CardHeader>
          <CardContent>
            <DependencyGraph />
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>MITRE ATLAS Mapping</CardTitle>
              <Badge variant="cyber">last 30d</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <MitreGrid />
          </CardContent>
        </Card>
      </div>

      {/* Findings + remediation */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Active findings ({FINDINGS.length})
          </h2>
          {FINDINGS.map((f, i) => (
            <FindingCard key={f.id} finding={f} index={i} />
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Remediation</CardTitle>
              <p className="text-xs text-muted-foreground">
                AI-prioritized fixes with effort estimates
              </p>
            </CardHeader>
            <CardContent>
              <RemediationChecklist />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
            <CardHeader>
              <CardTitle>Evidence Vault</CardTitle>
              <p className="text-xs text-muted-foreground">
                Tamper-evident artifacts for every finding
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "atlas-agent.scan-9981.sarif", size: "412 KB" },
                { name: "loan-workflow.role-bindings.json", size: "8.2 KB" },
                { name: "rag-mirror-diff.html", size: "3.1 MB" },
                { name: "orion-7b.pii-report.csv", size: "94 KB" },
                { name: "atlas-jailbreak-probes.jsonl", size: "1.7 MB" }
              ].map((e) => (
                <div
                  key={e.name}
                  className="flex items-center justify-between rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-xs hover:bg-background/60 transition"
                >
                  <span className="font-mono truncate">{e.name}</span>
                  <span className="text-muted-foreground shrink-0 ml-2">
                    {e.size}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
