import {
  Activity,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Search,
  ShieldOff
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
import { Input } from "@/components/ui/input";
import { INCIDENTS, AUDIT_TRAIL } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const STATUS_TONE: Record<string, string> = {
  active: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  investigating: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  resolved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  active: <AlertOctagon className="h-3.5 w-3.5" />,
  investigating: <Activity className="h-3.5 w-3.5" />,
  resolved: <CheckCircle2 className="h-3.5 w-3.5" />
};

const OUTCOME_TONE: Record<string, string> = {
  success: "text-emerald-400",
  failure: "text-rose-400",
  warning: "text-amber-400"
};

export default function IncidentsPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Operations"
        title="Incident Response"
        description="Active investigations, post-incident reviews, and an immutable audit trail across your AI estate."
        action={
          <>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search incidents..." className="pl-9 h-9 w-60" />
            </div>
            <Button size="sm">
              <ShieldOff className="h-4 w-4" />
              Open new incident
            </Button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>Open & Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {INCIDENTS.map((i) => (
              <div
                key={i.id}
                className="rounded-xl border border-border/40 bg-background/30 p-4 hover:bg-background/50 transition"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={i.severity as never}>{i.severity}</Badge>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${
                      STATUS_TONE[i.status]
                    }`}
                  >
                    {STATUS_ICON[i.status]} {i.status}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {i.id}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {relativeTime(i.detectedAt)} · MTTR {i.mttr}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold">{i.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {i.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    Asset · {i.asset}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View timeline
                    </Button>
                    <Button size="sm">Open runbook</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Audit Trail</CardTitle>
            <p className="text-xs text-muted-foreground">
              Immutable, signed events across the platform
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative pl-5">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-gradient-to-b from-violet-500/40 via-fuchsia-500/30 to-cyan-500/30" />
              {AUDIT_TRAIL.map((a) => (
                <div key={a.id} className="relative pb-4">
                  <span className="absolute -left-3.5 top-1.5 h-2 w-2 rounded-full bg-violet-400 ring-4 ring-violet-500/20" />
                  <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3 w-3" /> {relativeTime(a.timestamp)}
                  </div>
                  <div className="mt-0.5 text-sm">
                    <span className="font-mono text-violet-300">{a.actor}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.resource}</span>
                  </div>
                  <div
                    className={`text-[11px] font-medium ${
                      OUTCOME_TONE[a.outcome]
                    }`}
                  >
                    {a.outcome}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
