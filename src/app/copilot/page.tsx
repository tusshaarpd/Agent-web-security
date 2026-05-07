"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Bot, Code2, Sparkles, Wand2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  "Patch INC-2024-09-114 prompt injection in Atlas",
  "Reduce Loan Underwriting permissions to least-privilege",
  "Generate SOC 2 evidence for last sprint",
  "Draft remediation PR for /v1/embed rate limit"
];

const TRANSCRIPT = [
  {
    role: "user",
    body: "Patch the prompt injection in Atlas Customer Support Agent that allowed refund execution from a PDF attachment."
  },
  {
    role: "assistant",
    body: "I've analyzed the Atlas planner ingest path and the Stripe MCP tool binding. Here's the proposed remediation, with one runbook step and one code patch:"
  }
];

export default function CopilotPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="AI Studio"
        title="Sentinel Remediation Copilot"
        description="Ask the copilot to patch findings, draft policies, generate evidence, and wire-up guardrails."
        action={
          <Badge variant="cyber">
            <Sparkles className="h-3 w-3" />
            powered by claude-opus-4-7
          </Badge>
        }
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversation</CardTitle>
              <Badge variant="outline">session · INC-2024-09-114</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              {TRANSCRIPT.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 border border-violet-500/30"
                        : "bg-background/50 border border-border/50"
                    }`}
                  >
                    {m.body}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-border/50 bg-background/40 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="h-4 w-4 text-fuchsia-400" />
                  <span className="text-sm font-semibold">Proposed patch</span>
                  <Badge variant="cyber" className="ml-auto">
                    auto-generated
                  </Badge>
                </div>
                <pre className="text-xs font-mono bg-slate-950/70 rounded-lg p-3 overflow-x-auto border border-white/5">
                  <code className="text-slate-300">
                    <span className="text-rose-400">{"- "}</span>
                    {`def ingest_attachment(text): return planner.run(text)`}
                    {"\n"}
                    <span className="text-emerald-400">{"+ "}</span>
                    {`def ingest_attachment(text):`}
                    {"\n"}
                    <span className="text-emerald-400">{"+ "}</span>
                    {`    if injection_classifier.is_unsafe(text):`}
                    {"\n"}
                    <span className="text-emerald-400">{"+ "}</span>
                    {`        return planner.refuse(reason="untrusted_input")`}
                    {"\n"}
                    <span className="text-emerald-400">{"+ "}</span>
                    {`    return planner.run(envelope=External(text))`}
                  </code>
                </pre>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">
                    <Code2 className="h-4 w-4" />
                    Open PR
                  </Button>
                  <Button variant="outline" size="sm">
                    Add to runbook
                  </Button>
                  <Button variant="ghost" size="sm">
                    Regenerate
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 relative">
              <Input
                placeholder="Describe what you'd like Sentinel to fix, audit, or generate..."
                className="pr-12 h-12 text-sm"
              />
              <Button
                size="icon"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 h-fit">
          <CardHeader>
            <CardTitle>Suggested actions</CardTitle>
            <p className="text-xs text-muted-foreground">
              Highest-leverage AI fixes for this week
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={s}
                className="w-full text-left rounded-lg border border-border/40 bg-background/30 px-3 py-2.5 text-sm hover:bg-background/60 hover:border-violet-500/30 transition-all flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5 text-violet-300 shrink-0" />
                <span className="text-foreground/90">{s}</span>
              </button>
            ))}

            <div className="mt-4 rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent p-4 text-xs">
              <div className="font-semibold mb-1">Token usage today</div>
              <div className="font-mono text-2xl text-gradient">412k</div>
              <div className="text-muted-foreground mt-1">
                $1.92 · 28% of monthly budget
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
