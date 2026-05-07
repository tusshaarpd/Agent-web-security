import { Bell, Globe2, KeyRound, Shield, Users } from "lucide-react";
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
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Workspace"
        title="Settings"
        description="Configure organization, integrations, scan policies, and notification routing."
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-violet-300" />
              <CardTitle>Organization</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label>Workspace name</Label>
              <Input defaultValue="Sentinel · Acme Co." />
            </div>
            <div className="space-y-1.5">
              <Label>Default region</Label>
              <Input defaultValue="us-east-1" />
            </div>
            <Button size="sm">Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-300" />
              <CardTitle>Team & roles</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { n: "Mira Patel", r: "Owner" },
              { n: "Daniel Cho", r: "Engineer" },
              { n: "Wei Zhang", r: "Compliance" },
              { n: "Aisha Rahman", r: "Risk" }
            ].map((u) => (
              <div
                key={u.n}
                className="flex items-center justify-between rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-xs"
              >
                <span>{u.n}</span>
                <Badge variant="outline">{u.r}</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Invite teammate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-fuchsia-300" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Critical detections → Slack",
              "Compliance drift → Email",
              "Audit exports → Webhook",
              "Cost spikes → PagerDuty"
            ].map((n) => (
              <div
                key={n}
                className="flex items-center justify-between rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-xs"
              >
                <span>{n}</span>
                <Badge variant="success">on</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-emerald-300" />
              <CardTitle>Integrations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "GitHub",
              "Slack",
              "PagerDuty",
              "Jira",
              "Datadog",
              "Snowflake",
              "Vercel",
              "AWS"
            ].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border/40 bg-background/30 p-3 text-center text-sm hover:border-violet-500/30 transition"
              >
                {i}
                <Badge variant="success" className="mt-2 mx-auto">
                  connected
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-amber-300" />
              <CardTitle>API keys</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { n: "ci-runner", k: "sk_live_••••••3f1a" },
              { n: "datadog-export", k: "sk_live_••••••92a8" }
            ].map((k) => (
              <div
                key={k.n}
                className="rounded-lg border border-border/40 bg-background/30 p-3 text-xs"
              >
                <div className="font-medium">{k.n}</div>
                <div className="font-mono text-muted-foreground mt-0.5">
                  {k.k}
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              New key
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
