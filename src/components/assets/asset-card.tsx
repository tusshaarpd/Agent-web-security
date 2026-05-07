"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Boxes,
  Cog,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  type LucideIcon,
  Workflow
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { AIAsset } from "@/lib/types";
import { cn, relativeTime, severityFromScore } from "@/lib/utils";

const ICONS: Record<AIAsset["kind"], LucideIcon> = {
  agent: Bot,
  model: Cpu,
  rag: Database,
  api: Globe,
  prompt: Layers,
  tool: Cog,
  workflow: Workflow,
  mcp: Boxes
};

export function AssetCard({ asset, index = 0 }: { asset: AIAsset; index?: number }) {
  const Icon = ICONS[asset.kind] ?? Bot;
  const sev = severityFromScore(asset.riskScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
    >
      <Card className="group relative h-full overflow-hidden p-5 hover:border-violet-500/30 transition-all">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background/40 text-violet-300">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-semibold">{asset.name}</h3>
              <Badge variant={sev as never} className="capitalize shrink-0">
                {sev}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
              {asset.description}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
              <Badge variant="outline" className="capitalize">
                {asset.kind}
              </Badge>
              <span className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" /> {asset.environment}
              </span>
              <span>· {asset.region}</span>
              <span>· {asset.team}</span>
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/40 bg-background/30 p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
              Risk
            </div>
            <div
              className={cn(
                "text-lg font-bold font-mono mt-0.5",
                asset.riskScore >= 80
                  ? "text-rose-400"
                  : asset.riskScore >= 60
                  ? "text-orange-400"
                  : asset.riskScore >= 40
                  ? "text-amber-400"
                  : "text-emerald-400"
              )}
            >
              {asset.riskScore}
            </div>
            <div className="mt-2 h-1 rounded-full bg-muted/40 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  asset.riskScore >= 80
                    ? "bg-gradient-to-r from-rose-500 to-orange-500"
                    : asset.riskScore >= 60
                    ? "bg-gradient-to-r from-orange-400 to-amber-400"
                    : asset.riskScore >= 40
                    ? "bg-gradient-to-r from-amber-400 to-yellow-400"
                    : "bg-gradient-to-r from-emerald-400 to-cyan-400"
                )}
                style={{ width: `${asset.riskScore}%` }}
              />
            </div>
          </div>
          <div className="rounded-lg border border-border/40 bg-background/30 p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
              Compliance
            </div>
            <div className="text-lg font-bold font-mono mt-0.5 text-emerald-400">
              {asset.complianceScore}%
            </div>
            <div className="mt-2 h-1 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                style={{ width: `${asset.complianceScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Owner · {asset.owner}</span>
          <span>{relativeTime(asset.lastScanned)}</span>
        </div>
      </Card>
    </motion.div>
  );
}
