"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  ShieldCheck,
  XCircle
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
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  COMPLIANCE_FRAMEWORKS,
  RESPONSIBLE_AI_CHECKLIST,
  REMEDIATION_PROGRAM
} from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const STATUS_ICON: Record<string, React.ReactNode> = {
  passed: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />,
  failed: <XCircle className="h-3.5 w-3.5 text-rose-400" />,
  warning: <AlertCircle className="h-3.5 w-3.5 text-amber-400" />,
  not_applicable: <span className="h-3.5 w-3.5 rounded-full bg-muted/40" />
};

export default function GovernancePage() {
  const [active, setActive] = React.useState(COMPLIANCE_FRAMEWORKS[0].id);

  const completeChecklist =
    RESPONSIBLE_AI_CHECKLIST.filter((c) => c.done).length;
  const maturityScore = Math.round(
    (completeChecklist / RESPONSIBLE_AI_CHECKLIST.length) * 100
  );

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Governance"
        title="AI Governance & Compliance"
        description="Continuous controls, evidence collection, and audit readiness across SOC 2, GDPR, HIPAA, and ISO 27001."
        action={
          <>
            <Button variant="outline" size="sm">
              <FileCheck2 className="h-4 w-4" />
              Generate evidence pack
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              Export audit report
            </Button>
          </>
        }
      />

      {/* Top: framework cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COMPLIANCE_FRAMEWORKS.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActive(f.id)}
            className={`text-left rounded-xl border p-5 backdrop-blur-xl transition-all ${
              active === f.id
                ? "border-violet-500/40 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 shadow-lg shadow-violet-500/10"
                : "border-border/50 bg-card/40 hover:border-violet-500/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <Badge variant="cyber">{f.shortName}</Badge>
              <ShieldCheck className="h-4 w-4 text-violet-300" />
            </div>
            <div className="mt-3 text-2xl font-bold font-mono text-gradient">
              {f.score}%
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {f.description}
            </p>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                {f.passing}
              </span>
              <span className="flex items-center gap-1">
                <XCircle className="h-3 w-3 text-rose-400" />
                {f.failing}
              </span>
              <span className="ml-auto">{f.total} total</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Active framework controls */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Controls ·{" "}
                {COMPLIANCE_FRAMEWORKS.find((f) => f.id === active)?.name}
              </CardTitle>
              <Badge variant="outline">live evidence</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={active} onValueChange={setActive} className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                {COMPLIANCE_FRAMEWORKS.map((f) => (
                  <TabsTrigger key={f.id} value={f.id}>
                    {f.shortName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {COMPLIANCE_FRAMEWORKS.map((f) => (
                <TabsContent key={f.id} value={f.id} className="mt-4 space-y-2">
                  {f.controls.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/30 p-3"
                    >
                      <div className="mt-0.5">{STATUS_ICON[c.status]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="cyber" className="font-mono">
                            {c.code}
                          </Badge>
                          <span className="text-sm font-medium">
                            {c.title}
                          </span>
                        </div>
                        {c.evidence && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {c.evidence}
                          </p>
                        )}
                        <div className="mt-1.5 text-[11px] text-muted-foreground">
                          Owner · {c.owner}
                        </div>
                      </div>
                      <Badge
                        variant={
                          c.status === "passed"
                            ? "success"
                            : c.status === "failed"
                            ? "critical"
                            : c.status === "warning"
                            ? "warning"
                            : "outline"
                        }
                        className="capitalize shrink-0"
                      >
                        {c.status.replace("_", " ")}
                      </Badge>
                    </motion.div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Maturity & checklist */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>AI Governance Maturity</CardTitle>
            <p className="text-xs text-muted-foreground">
              Responsible AI checklist · {completeChecklist} /{" "}
              {RESPONSIBLE_AI_CHECKLIST.length} complete
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/5 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold font-mono text-gradient">
                  {maturityScore}
                </span>
                <Badge variant="success">Tier 3 · Optimized</Badge>
              </div>
              <Progress value={maturityScore} className="mt-3" />
              <p className="mt-2 text-xs text-muted-foreground">
                Above the 71st percentile for regulated peers.
              </p>
            </div>

            <div className="mt-4 space-y-1.5">
              {RESPONSIBLE_AI_CHECKLIST.map((it) => (
                <div
                  key={it.item}
                  className="flex items-center gap-2.5 text-xs rounded-md px-2 py-1.5 hover:bg-accent/40"
                >
                  {it.done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  )}
                  <span
                    className={
                      it.done ? "" : "text-muted-foreground"
                    }
                  >
                    {it.item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit readiness */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Remediation Program Velocity</CardTitle>
              <Badge variant="outline">last 6 weeks</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={REMEDIATION_PROGRAM}
                margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.12)"
                />
                <XAxis
                  dataKey="week"
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
                  cursor={{ fill: "rgba(139,92,246,0.08)" }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11 }}
                  formatter={(v: string) => (
                    <span className="text-xs text-muted-foreground capitalize">
                      {v}
                    </span>
                  )}
                />
                <Bar dataKey="planned" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                <Bar
                  dataKey="completed"
                  fill="#22d3ee"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Audit Readiness Tracker</CardTitle>
            <p className="text-xs text-muted-foreground">
              Quarterly readiness for the next external audit
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { f: "SOC 2 Type II", v: 94, due: "Aug 2026", color: "violet" },
              { f: "ISO 27001", v: 89, due: "Oct 2026", color: "fuchsia" },
              { f: "GDPR DPIA", v: 78, due: "Jul 2026", color: "cyan" },
              { f: "HIPAA", v: 72, due: "Sep 2026", color: "amber" }
            ].map((r) => (
              <div key={r.f}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{r.f}</span>
                  <span className="text-muted-foreground">due {r.due}</span>
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <Progress value={r.v} className="flex-1" />
                  <span className="font-mono text-xs">{r.v}%</span>
                </div>
              </div>
            ))}

            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs flex items-start gap-2">
              <ClipboardCheck className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">
                12,840 evidence artifacts collected automatically this quarter,
                cutting audit prep time by 93%.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
