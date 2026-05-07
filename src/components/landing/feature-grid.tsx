"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Eye,
  FileSearch,
  Fingerprint,
  Layers,
  Lock,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  Workflow
} from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "Agentic Risk Modeling",
    description:
      "Discover, baseline, and continuously score every AI agent, plan-step, and tool action.",
    accent: "from-violet-500/30 to-fuchsia-500/10"
  },
  {
    icon: ScanLine,
    title: "Prompt Injection Defense",
    description:
      "Detect direct, indirect, and multi-modal injection attempts across the planner and tools.",
    accent: "from-rose-500/30 to-orange-500/10"
  },
  {
    icon: Brain,
    title: "Hallucination Analytics",
    description:
      "Quantify hallucination risk per response, per use case, and per model version.",
    accent: "from-cyan-500/30 to-sky-500/10"
  },
  {
    icon: Workflow,
    title: "MCP & Tool Governance",
    description:
      "Inventory MCP servers, model their permission surface, and enforce least-privilege.",
    accent: "from-emerald-500/30 to-teal-500/10"
  },
  {
    icon: Lock,
    title: "Data Leakage Prevention",
    description:
      "PII detection, model inversion checks, and gradient leakage analysis on training data.",
    accent: "from-amber-500/30 to-orange-500/10"
  },
  {
    icon: Network,
    title: "RAG Integrity",
    description:
      "Source signing, poisoning detection, and provenance for every retrieved chunk.",
    accent: "from-indigo-500/30 to-violet-500/10"
  },
  {
    icon: Eye,
    title: "Shadow AI Discovery",
    description:
      "Map every unsanctioned model, plugin, or copilot deployed across your enterprise.",
    accent: "from-pink-500/30 to-rose-500/10"
  },
  {
    icon: FileSearch,
    title: "Continuous Audit",
    description:
      "Immutable audit trail and tamper-evident evidence for every model and prompt change.",
    accent: "from-sky-500/30 to-cyan-500/10"
  },
  {
    icon: Fingerprint,
    title: "Identity-Aware Access",
    description:
      "Role-based gates on every tool invocation; bind prompts to verified user context.",
    accent: "from-teal-500/30 to-emerald-500/10"
  },
  {
    icon: Layers,
    title: "Defense in Depth",
    description:
      "Layered guardrails — input, planner, tool, output — backed by behavioral analytics.",
    accent: "from-fuchsia-500/30 to-pink-500/10"
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    description:
      "Live feed of emerging jailbreaks, prompt-injection corpora, and CVEs for AI stacks.",
    accent: "from-orange-500/30 to-amber-500/10"
  },
  {
    icon: ShieldCheck,
    title: "Compliance Automation",
    description:
      "SOC2, GDPR, HIPAA, ISO 27001, EU AI Act — controls mapped, evidence collected.",
    accent: "from-violet-500/30 to-cyan-500/10"
  }
];

export function FeatureGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {FEATURES.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 hover:border-violet-500/30 transition-all overflow-hidden"
          >
            <div
              className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl opacity-50 group-hover:opacity-90 transition-opacity bg-gradient-to-br ${f.accent}`}
            />
            <div className="relative">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/40 backdrop-blur">
                <Icon className="h-5 w-5 text-violet-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
