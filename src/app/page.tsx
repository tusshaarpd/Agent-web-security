import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  PlayCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { LandingNav } from "@/components/landing/landing-nav";
import { HeroVisual } from "@/components/landing/hero-visual";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { TrustStrip } from "@/components/landing/trust-strip";
import { PreviewMock } from "@/components/landing/preview-mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiskGauge } from "@/components/dashboard/risk-gauge";

const STATS = [
  { v: "12.4M", l: "AI events analyzed daily" },
  { v: "94%", l: "Reduction in mean time to detect" },
  { v: "37+", l: "Pre-built AI risk checks" },
  { v: "SOC 2", l: "Type II + ISO 27001 certified" }
];

const RISK_PILLARS = [
  {
    title: "Prompt Injection",
    description:
      "Indirect, multi-modal, and supply-chain injection paths across every agent surface.",
    score: 94
  },
  {
    title: "Tool Permission",
    description:
      "Least-privilege analysis for MCP servers, function calls, and autonomous workflows.",
    score: 88
  },
  {
    title: "Data Exfiltration",
    description:
      "PII, secrets, and trade-secret leakage detection across prompt, completion, and embedding paths.",
    score: 91
  },
  {
    title: "Compliance & Audit",
    description:
      "SOC 2, GDPR, HIPAA, ISO 27001, EU AI Act controls mapped and continuously validated.",
    score: 96
  }
];

export default function LandingPage() {
  return (
    <div className="relative">
      <LandingNav />

      {/* HERO */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Badge
                variant="cyber"
                className="mb-6 px-3 py-1 text-[11px] tracking-widest uppercase"
              >
                <Sparkles className="h-3 w-3" />
                AI Security Cloud · v4.7
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Govern, secure, and scale
                <br />
                <span className="text-gradient-cyber">
                  every AI agent in your enterprise.
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Sentinel AI is the unified control plane for AI risk — combining
                continuous red-teaming, runtime guardrails, governance, and
                threat intelligence for LLM apps, MCP tools, RAG pipelines, and
                autonomous agents.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Launch Console
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="cyber">
                  <Link href="/submit">
                    <PlayCircle className="h-4 w-4" />
                    Submit an asset
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/analysis">View live findings</Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {STATS.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold tracking-tight font-mono">
                      {s.v}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section id="trust" className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <TrustStrip />
      </section>

      {/* RISK INTELLIGENCE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Badge variant="outline" className="mb-4">
              <ShieldCheck className="h-3 w-3" />
              Risk Intelligence
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              From a single agent to{" "}
              <span className="text-gradient">enterprise-wide posture</span>.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Continuously model the unique risk profile of every AI surface in
              your stack. Sentinel correlates static configuration, runtime
              behavior, and adversarial probing into a single, explainable
              score — with evidence engineers and auditors can trust.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              {[
                "Out-of-the-box checks for 37+ AI risk classes",
                "Continuous adversarial red-teaming on a schedule",
                "Mapped to MITRE ATLAS, OWASP LLM Top 10, NIST AI RMF",
                "Audit-ready evidence packs for every control"
              ].map((line) => (
                <div
                  key={line}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 sm:p-8">
              <div className="grid sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex items-center justify-center">
                  <RiskGauge score={86} label="Posture Score" />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  {RISK_PILLARS.map((p) => (
                    <div
                      key={p.title}
                      className="rounded-xl border border-border/40 bg-background/30 p-3"
                    >
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>{p.title}</span>
                        <span className="font-mono text-emerald-400">
                          {p.score}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {p.description}
                      </p>
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted/40">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-20 scroll-mt-24"
      >
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Cpu className="h-3 w-3" /> Platform
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            One platform.{" "}
            <span className="text-gradient">Twelve security pillars.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Replace the patchwork of point tools with a unified AI security
            cloud designed for the agentic era.
          </p>
        </div>
        <FeatureGrid />
      </section>

      {/* PRODUCT PREVIEW */}
      <section
        id="preview"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-20 scroll-mt-24"
      >
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Console
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            A console built for{" "}
            <span className="text-gradient">security-led AI teams</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real-time KPIs, threat intelligence, governance evidence, and
            attack-replay — all in one place.
          </p>
        </div>
        <PreviewMock />
      </section>

      {/* GOVERNANCE */}
      <section
        id="governance"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-20 scroll-mt-24"
      >
        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10 p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="cyber" className="mb-4">
                Responsible AI
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Compliance evidence,{" "}
                <span className="text-gradient">on autopilot</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Map every AI control to SOC 2, GDPR, HIPAA, ISO 27001, and the
                EU AI Act. Sentinel captures evidence as you build, so audits
                become a one-click export — not a quarter-long sprint.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["SOC 2", "GDPR", "HIPAA", "ISO 27001", "EU AI Act", "NIST AI RMF"].map(
                  (b) => (
                    <Badge key={b} variant="outline" className="px-3 py-1">
                      {b}
                    </Badge>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Controls mapped", v: "287" },
                { l: "Evidence collected", v: "12,840" },
                { l: "Audit reports / yr", v: "44" },
                { l: "Mean prep time", v: "−93%" }
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 backdrop-blur-xl p-5"
                >
                  <div className="text-3xl font-bold font-mono text-gradient">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Ship AI safely.{" "}
          <span className="text-gradient">From day one.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Join the design partners deploying agents in production with full
          visibility, control, and auditability.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Launch console
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/submit">Run a free risk scan</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/40 py-10 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
            <span>
              © {new Date().getFullYear()} Sentinel AI · Enterprise AI Security
              Cloud
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground transition">
              Trust Center
            </a>
            <a href="#" className="hover:text-foreground transition">
              Status
            </a>
            <a href="#" className="hover:text-foreground transition">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
