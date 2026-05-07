"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  Cog,
  Crosshair,
  FileText,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Target,
  TimerReset
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Finding } from "@/lib/types";
import { cn, relativeTime } from "@/lib/utils";

const SEV_TONE: Record<string, string> = {
  critical: "from-rose-500/20 to-orange-500/10 border-rose-500/30",
  high: "from-orange-500/20 to-amber-500/10 border-orange-500/30",
  medium: "from-amber-500/20 to-yellow-500/10 border-amber-500/30",
  low: "from-cyan-500/20 to-sky-500/10 border-cyan-500/30",
  info: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30"
};

export function FindingCard({
  finding,
  index = 0
}: {
  finding: Finding;
  index?: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden border bg-gradient-to-br backdrop-blur-xl",
          SEV_TONE[finding.severity]
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left"
        >
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/40 text-rose-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={finding.severity as never}>
                      {finding.severity}
                    </Badge>
                    <Badge variant="outline">{finding.category}</Badge>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {finding.id}
                    </span>
                    {finding.mitre && (
                      <Badge variant="cyber">{finding.mitre}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Gauge className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono">
                        {finding.confidence}% confidence
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </div>
                </div>
                <h3 className="mt-2 text-base font-semibold">{finding.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {finding.businessImpact}
                </p>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {finding.affectedComponent}
                  </span>
                  <span className="flex items-center gap-1">
                    <TimerReset className="h-3 w-3" />
                    Effort: {finding.effort}
                  </span>
                  <span>· {relativeTime(finding.detectedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/40 p-5 grid lg:grid-cols-3 gap-5 bg-background/30">
                <Section
                  icon={FileText}
                  title="Technical explanation"
                  body={finding.technicalExplanation}
                />
                <Section
                  icon={Crosshair}
                  title="Attack scenario"
                  body={finding.attackScenario}
                />
                <Section
                  icon={Lightbulb}
                  title="Remediation"
                  body={finding.remediation}
                />

                <div className="lg:col-span-3 grid sm:grid-cols-3 gap-3">
                  <Metric label="Confidence" value={`${finding.confidence}%`}>
                    <Progress value={finding.confidence} className="mt-2" />
                  </Metric>
                  <Metric label="Severity" value={finding.severity}>
                    <Badge variant={finding.severity as never} className="mt-2">
                      {finding.severity}
                    </Badge>
                  </Metric>
                  <Metric label="Estimated effort" value={finding.effort}>
                    <Badge variant="outline" className="mt-2">
                      <Cog className="h-3 w-3" /> {finding.effort}
                    </Badge>
                  </Metric>
                </div>

                <div className="lg:col-span-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Status: <span className="capitalize">{finding.status}</span>
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Suppress
                    </Button>
                    <Button variant="outline" size="sm">
                      Open ticket
                    </Button>
                    <Button size="sm">
                      <ShieldCheck className="h-4 w-4" />
                      Apply fix
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function Section({
  icon: Icon,
  title,
  body
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  children
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold capitalize">{value}</div>
      {children}
    </div>
  );
}
