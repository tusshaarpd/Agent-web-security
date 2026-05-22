"use client";

import {
  Bot,
  Briefcase,
  Crown,
  Download,
  FileText,
  Sparkles,
  TrendingUp
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
import { PostureTimeline } from "@/components/dashboard/posture-timeline";

const TEMPLATES = [
  {
    title: "Executive Risk Briefing",
    icon: Crown,
    description:
      "C-suite narrative covering posture trend, top risks, and roadmap.",
    duration: "5 min read",
    tone: "from-violet-500/30 to-fuchsia-500/10"
  },
  {
    title: "Board-ready AI Governance Report",
    icon: Briefcase,
    description:
      "Quarterly governance maturity, control coverage, and audit readiness.",
    duration: "12 pages",
    tone: "from-cyan-500/30 to-sky-500/10"
  },
  {
    title: "Engineering Findings Pack",
    icon: Bot,
    description:
      "Detailed remediation backlog with code-level evidence and AI fixes.",
    duration: "PDF / SARIF",
    tone: "from-emerald-500/30 to-teal-500/10"
  },
  {
    title: "Vendor Risk Summary",
    icon: TrendingUp,
    description:
      "Per-foundation-model risk view for procurement and vendor reviews.",
    duration: "8 pages",
    tone: "from-amber-500/30 to-orange-500/10"
  }
];

const PUBLISHED = [
  {
    title: "Q1 2026 — Executive Risk Briefing",
    type: "Executive",
    when: "May 06, 2026",
    size: "1.2 MB"
  },
  {
    title: "April 2026 — Atlas Agent Findings Pack",
    type: "Engineering",
    when: "May 04, 2026",
    size: "3.8 MB"
  },
  {
    title: "Q1 2026 — SOC 2 Evidence Bundle",
    type: "Audit",
    when: "Apr 30, 2026",
    size: "12.6 MB"
  },
  {
    title: "March 2026 — Vendor Risk Summary",
    type: "Procurement",
    when: "Mar 28, 2026",
    size: "920 KB"
  }
];

export default function ReportsPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Reporting"
        title="Reports & Executive Briefings"
        description="One-click executive narratives, governance evidence packs, and engineering remediation backlogs."
        action={
          <Button>
            <Sparkles className="h-4 w-4" />
            Generate report
          </Button>
        }
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TEMPLATES.map((t) => {
          const Icon = t.icon;
          return (
            <Card
              key={t.title}
              className="group relative overflow-hidden p-5 hover:border-violet-500/30 transition-all"
            >
              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition bg-gradient-to-br ${t.tone}`}
              />
              <div className="relative">
                <Icon className="h-5 w-5 text-violet-300" />
                <h3 className="mt-3 text-sm font-semibold">{t.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-3">
                  {t.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline">{t.duration}</Badge>
                  <Button variant="ghost" size="sm">
                    Generate
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Executive Posture Trend</CardTitle>
            <p className="text-xs text-muted-foreground">
              Auto-included in every executive briefing
            </p>
          </CardHeader>
          <CardContent>
            <PostureTimeline />
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Recently Published</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PUBLISHED.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 p-3"
              >
                <FileText className="h-4 w-4 text-violet-300" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{r.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {r.type} · {r.when} · {r.size}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
