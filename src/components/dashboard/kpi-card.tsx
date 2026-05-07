"use client";

import { motion } from "framer-motion";
import { type LucideIcon, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: number | string;
  delta?: number;
  unit?: string;
  icon: LucideIcon;
  tone?: "violet" | "cyan" | "emerald" | "rose" | "amber";
  description?: string;
  index?: number;
}

const TONE_RING: Record<string, string> = {
  violet: "from-violet-500/20 to-fuchsia-500/10",
  cyan: "from-cyan-500/20 to-sky-500/10",
  emerald: "from-emerald-500/20 to-teal-500/10",
  rose: "from-rose-500/20 to-pink-500/10",
  amber: "from-amber-500/20 to-orange-500/10"
};

const TONE_TEXT: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
  rose: "text-rose-400",
  amber: "text-amber-400"
};

export function KpiCard({
  label,
  value,
  delta,
  unit,
  icon: Icon,
  tone = "violet",
  description,
  index = 0
}: KpiCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <Card className="group relative overflow-hidden p-5 hover:shadow-xl hover:shadow-violet-500/5 transition-all">
        <div
          className={cn(
            "absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity bg-gradient-to-br",
            TONE_RING[tone]
          )}
        />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight font-mono">
                {value}
              </span>
              {unit && (
                <span className="text-xs text-muted-foreground">{unit}</span>
              )}
            </div>
            {description && (
              <p className="mt-1.5 text-[11px] text-muted-foreground line-clamp-1">
                {description}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/40 backdrop-blur",
              TONE_TEXT[tone]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {typeof delta === "number" && (
          <div className="relative mt-3 flex items-center gap-1">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium",
                positive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-rose-500/10 text-rose-400"
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(delta)}%
            </span>
            <span className="text-[11px] text-muted-foreground">
              vs last period
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
