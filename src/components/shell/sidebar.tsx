"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  Boxes,
  Upload,
  ScanLine,
  ClipboardCheck,
  Radar,
  Activity,
  BookCheck,
  Sparkles,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/assets", label: "AI Assets", icon: Boxes },
  { href: "/submit", label: "Submit Asset", icon: Upload },
  { href: "/analysis", label: "Findings", icon: ShieldAlert, badge: "9" },
  { href: "/threats", label: "Threat Intel", icon: Radar, badge: "live" },
  { href: "/simulation", label: "Simulation", icon: ScanLine },
  { href: "/governance", label: "Governance", icon: ClipboardCheck },
  { href: "/incidents", label: "Incidents", icon: Activity },
  { href: "/reports", label: "Reports", icon: BookCheck }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-64 shrink-0 flex-col border-r border-border/50 bg-card/30 backdrop-blur-2xl sticky top-0">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border/40">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="px-3 py-4 flex-1 overflow-y-auto scrollbar-thin">
        <p className="px-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          Workspace
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  active
                    ? "bg-gradient-to-r from-violet-500/15 to-fuchsia-500/10 text-foreground border border-violet-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {active && (
                  <span className="absolute -left-3 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-400 to-fuchsia-400" />
                )}
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active ? "text-violet-400" : "group-hover:text-foreground"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={item.badge === "live" ? "critical" : "outline"}
                    className={cn(
                      "h-5 text-[10px] px-1.5",
                      item.badge === "live" && "animate-pulse"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <p className="mt-6 px-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          AI Studio
        </p>
        <Link
          href="/copilot"
          className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <Sparkles className="h-4 w-4 text-fuchsia-400" />
          <span>AI Remediation Copilot</span>
          <Badge variant="cyber" className="h-5 text-[10px] px-1.5 ml-auto">
            new
          </Badge>
        </Link>
        <Link
          href="/settings"
          className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="m-3 rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent p-4">
        <div className="text-xs font-semibold">Risk Posture</div>
        <div className="mt-1 text-2xl font-bold text-gradient">A-</div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          +6 pts vs last quarter
        </p>
      </div>
    </aside>
  );
}
