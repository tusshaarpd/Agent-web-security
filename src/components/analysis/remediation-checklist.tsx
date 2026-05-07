"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Circle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ITEMS = [
  {
    title: "Wrap untrusted attachments in an envelope before planner ingest",
    severity: "critical",
    eta: "2d"
  },
  {
    title: "Drop secrets:write scope from GitHub MCP manifest",
    severity: "high",
    eta: "30m"
  },
  {
    title: "Sign indexed compliance documents before re-index",
    severity: "high",
    eta: "1d"
  },
  {
    title: "Replace Orion-7B fine-tuning corpus with redacted pipeline",
    severity: "high",
    eta: "5d"
  },
  {
    title: "Add output meta-classifier to Atlas system prompt",
    severity: "medium",
    eta: "1d"
  },
  {
    title: "Validate all suggested package names against npm registry",
    severity: "medium",
    eta: "4h"
  },
  {
    title: "Apply tier-1 rate limit to /v1/embed endpoint",
    severity: "medium",
    eta: "20m"
  }
];

export function RemediationChecklist() {
  const [done, setDone] = React.useState<string[]>([]);
  const toggle = (k: string) =>
    setDone((d) => (d.includes(k) ? d.filter((x) => x !== k) : [...d, k]));

  return (
    <div className="space-y-2">
      {ITEMS.map((it, i) => {
        const checked = done.includes(it.title);
        return (
          <motion.button
            key={it.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => toggle(it.title)}
            className={`group flex w-full items-start gap-3 rounded-lg border border-border/40 bg-background/30 p-3 text-left transition-all hover:bg-background/60 ${
              checked && "opacity-60"
            }`}
          >
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                checked
                  ? "border-emerald-500 bg-emerald-500/30"
                  : "border-border bg-background/40 group-hover:border-violet-500/40"
              }`}
            >
              {checked ? (
                <Check className="h-3 w-3 text-white" />
              ) : (
                <Circle className="h-2 w-2 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div
                className={`text-sm ${
                  checked ? "line-through text-muted-foreground" : "font-medium"
                }`}
              >
                {it.title}
              </div>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Badge variant={it.severity as never}>{it.severity}</Badge>
                <span>ETA {it.eta}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition"
              type="button"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI fix
            </Button>
          </motion.button>
        );
      })}
    </div>
  );
}
