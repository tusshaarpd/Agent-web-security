"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  Loader2,
  Network,
  ScanLine,
  Shield,
  Sparkles,
  Upload,
  Workflow
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const KINDS = [
  { v: "agent", label: "AI Agent", icon: Bot, hint: "Autonomous planner + tools" },
  { v: "model", label: "ML Model", icon: Cpu, hint: "LLM, embedding, classifier" },
  { v: "rag", label: "RAG Pipeline", icon: Database, hint: "Vector store + retriever" },
  { v: "api", label: "API", icon: Globe, hint: "Inference or control endpoint" },
  { v: "prompt", label: "Prompt Pack", icon: Layers, hint: "System prompts + templates" },
  { v: "tool", label: "Tool", icon: FileCode2, hint: "Function-calling action" },
  { v: "workflow", label: "Workflow", icon: Workflow, hint: "Multi-step orchestration" },
  { v: "mcp", label: "MCP Server", icon: Network, hint: "Model Context Protocol surface" }
];

const STEPS = ["Asset Type", "Metadata", "Configuration", "Permissions", "Scan"] as const;

interface FormState {
  kind: string;
  name: string;
  vendor: string;
  environment: string;
  owner: string;
  description: string;
  endpoint: string;
  config: string;
  permissions: string[];
}

const DEFAULT_PERMS = [
  "read:storage",
  "write:storage",
  "exec:tools",
  "network:egress",
  "secrets:read",
  "secrets:write"
];

export function SubmissionWizard() {
  const [step, setStep] = React.useState(0);
  const [scanning, setScanning] = React.useState(false);
  const [scanComplete, setScanComplete] = React.useState(false);
  const [scanProgress, setScanProgress] = React.useState(0);
  const [form, setForm] = React.useState<FormState>({
    kind: "agent",
    name: "",
    vendor: "Internal",
    environment: "staging",
    owner: "",
    description: "",
    endpoint: "",
    config: '{\n  "model": "claude-opus-4-7",\n  "tools": ["github", "stripe"]\n}',
    permissions: ["read:storage", "exec:tools"]
  });

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const togglePerm = (p: string) =>
    update(
      "permissions",
      form.permissions.includes(p)
        ? form.permissions.filter((x) => x !== p)
        : [...form.permissions, p]
    );

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    const id = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setScanning(false);
          setScanComplete(true);
          return 100;
        }
        return p + 6;
      });
    }, 220);
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <Card className="overflow-hidden">
      {/* Stepper */}
      <div className="border-b border-border/40 px-6 py-5">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <React.Fragment key={s}>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active &&
                      "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/15 text-foreground border border-violet-500/30",
                    done && "text-emerald-400",
                    !active && !done && "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold border",
                      active &&
                        "border-violet-500/50 bg-violet-500/20 text-violet-200",
                      done && "border-emerald-500/40 bg-emerald-500/15",
                      !active && !done && "border-border bg-background/40"
                    )}
                  >
                    {done ? <Check className="h-3 w-3" /> : i + 1}
                  </div>
                  {s}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-px flex-1",
                      i < step ? "bg-emerald-500/40" : "bg-border/40"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold">What are you submitting?</h2>
              <p className="text-sm text-muted-foreground">
                Choose the asset type — Sentinel will tailor the security
                checks to that surface.
              </p>
              <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {KINDS.map((k) => {
                  const Icon = k.icon;
                  const selected = form.kind === k.v;
                  return (
                    <button
                      key={k.v}
                      type="button"
                      onClick={() => update("kind", k.v)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all",
                        selected
                          ? "border-violet-500/50 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 shadow-lg shadow-violet-500/10"
                          : "border-border/50 bg-background/30 hover:border-violet-500/30"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 mb-2",
                          selected ? "text-violet-300" : "text-muted-foreground"
                        )}
                      />
                      <div className="text-sm font-medium">{k.label}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">
                        {k.hint}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold">Asset metadata</h2>
              <p className="text-sm text-muted-foreground">
                Give the asset a name, owner, and environment so it lands in
                the right governance scope.
              </p>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Atlas Customer Support Agent"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={form.vendor}
                    onChange={(e) => update("vendor", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="env">Environment</Label>
                  <select
                    id="env"
                    value={form.environment}
                    onChange={(e) => update("environment", e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-input bg-background/40 px-3 py-2 text-sm backdrop-blur"
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="owner">Owner</Label>
                  <Input
                    id="owner"
                    placeholder="email@org"
                    value={form.owner}
                    onChange={(e) => update("owner", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    placeholder="Briefly describe the use case, traffic, and data sensitivity..."
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold">Configuration & artifacts</h2>
              <p className="text-sm text-muted-foreground">
                Drop a YAML/JSON config or paste the manifest directly. We'll
                parse model versions, tool surface, and policy directives.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="endpoint">Endpoint URL</Label>
                  <Input
                    id="endpoint"
                    placeholder="https://api.org.com/v1/agent"
                    value={form.endpoint}
                    onChange={(e) => update("endpoint", e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Upload manifest</Label>
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-background/20 hover:border-violet-500/40 hover:bg-background/40 transition-colors">
                    <Upload className="h-5 w-5 text-violet-300" />
                    <span className="text-sm font-medium">
                      Drag & drop YAML or JSON
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Up to 5 MB · agent.yaml, mcp.json, model_card.md
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="config">Inline manifest</Label>
                  <Textarea
                    id="config"
                    rows={8}
                    className="font-mono text-xs"
                    value={form.config}
                    onChange={(e) => update("config", e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold">Permissions & scope</h2>
              <p className="text-sm text-muted-foreground">
                Select the capabilities this asset will be granted. Sentinel
                will flag excessive scopes and propose least-privilege.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {DEFAULT_PERMS.map((p) => {
                  const sel = form.permissions.includes(p);
                  const sensitive = p.startsWith("write:") || p.startsWith("secrets:");
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePerm(p)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all",
                        sel
                          ? "border-violet-500/40 bg-violet-500/10"
                          : "border-border/50 bg-background/30 hover:bg-background/50"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                          sel
                            ? "border-violet-500 bg-violet-500/40"
                            : "border-border"
                        )}
                      >
                        {sel && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-mono">{p}</div>
                        {sensitive && (
                          <div className="text-[11px] text-amber-400 mt-0.5">
                            Elevated scope · requires review
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold">Run security analysis</h2>
              <p className="text-sm text-muted-foreground">
                Sentinel will execute 37+ AI security checks against{" "}
                <span className="text-foreground font-medium">
                  {form.name || "your asset"}
                </span>
                . Estimated runtime: 4–8 minutes.
              </p>

              <div className="mt-5 grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 rounded-xl border border-border/50 bg-background/30 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ScanLine className="h-5 w-5 text-violet-300" />
                      <span className="font-semibold text-sm">
                        Scan readiness
                      </span>
                    </div>
                    {scanComplete ? (
                      <Badge variant="success">Completed</Badge>
                    ) : scanning ? (
                      <Badge variant="cyber">Running</Badge>
                    ) : (
                      <Badge variant="outline">Idle</Badge>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <KV label="Asset" v={form.name || "Unnamed"} />
                    <KV label="Type" v={form.kind} />
                    <KV label="Environment" v={form.environment} />
                    <KV label="Owner" v={form.owner || "—"} />
                    <KV
                      label="Permissions"
                      v={`${form.permissions.length} scopes`}
                    />
                    <KV label="Endpoint" v={form.endpoint || "(none)"} />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-mono">{scanProgress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <div className="mt-4">
                      {!scanComplete && (
                        <Button
                          onClick={startScan}
                          disabled={scanning}
                          className="w-full"
                        >
                          {scanning ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Scanning {scanProgress}%
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Launch Sentinel scan
                            </>
                          )}
                        </Button>
                      )}
                      {scanComplete && (
                        <div className="flex gap-2">
                          <Button asChild className="flex-1">
                            <a href="/analysis">
                              <Shield className="h-4 w-4" />
                              View findings (12)
                            </a>
                          </Button>
                          <Button variant="outline" asChild>
                            <a href="/dashboard">Go to dashboard</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border/50 bg-background/30 p-5">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Checks queued
                  </div>
                  <div className="space-y-2">
                    {[
                      "Prompt injection probes",
                      "Jailbreak corpus (240)",
                      "PII / data leakage",
                      "Tool permission audit",
                      "RAG poisoning probe",
                      "Hallucination eval",
                      "Compliance mapping",
                      "Dependency CVE scan"
                    ].map((c, i) => (
                      <div
                        key={c}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            scanComplete
                              ? "bg-emerald-400"
                              : scanning && scanProgress > i * 12
                              ? "bg-violet-400 animate-pulse"
                              : "bg-muted-foreground/40"
                          )}
                        />
                        <span
                          className={cn(
                            scanComplete
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 px-6 py-4 flex items-center justify-between bg-background/30">
        <div className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Final step
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function KV({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-xs truncate">{v}</div>
    </div>
  );
}
