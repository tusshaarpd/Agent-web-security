"use client";

import { Bell, Command, Search, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/60 px-4 sm:px-6 backdrop-blur-2xl">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search assets, findings, agents, MCP tools..."
          className="pl-9 pr-16 h-10 bg-background/40"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border bg-muted/40 px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>

      <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Sentinel Engine
        <span className="font-medium text-emerald-500">online</span>
      </div>

      <Button variant="outline" size="sm" className="hidden md:inline-flex">
        <Shield className="h-4 w-4 text-emerald-400" />
        Posture A-
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <Badge
          variant="critical"
          className="absolute -top-0.5 -right-0.5 h-4 px-1 text-[9px]"
        >
          3
        </Badge>
      </Button>

      <ThemeToggle />

      <Avatar className="ring-1 ring-violet-500/40">
        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          MP
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
