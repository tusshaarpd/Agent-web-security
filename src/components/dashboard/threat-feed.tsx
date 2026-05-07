"use client";

import { motion } from "framer-motion";
import { Globe2, Shield, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { THREAT_FEED } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

export function ThreatFeed() {
  return (
    <div className="space-y-2">
      {THREAT_FEED.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group relative flex items-start gap-3 rounded-lg border border-border/40 bg-background/30 p-3 hover:bg-background/60 transition-colors"
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
              event.blocked
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-rose-500/30 bg-rose-500/10 text-rose-400"
            }`}
          >
            {event.blocked ? (
              <Shield className="h-4 w-4" />
            ) : (
              <ShieldOff className="h-4 w-4" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium truncate">
                {event.type}
              </span>
              <Badge variant={event.severity as never}>{event.severity}</Badge>
              {event.blocked ? (
                <Badge variant="success">blocked</Badge>
              ) : (
                <Badge variant="critical">propagating</Badge>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
              {event.description}
            </p>
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Globe2 className="h-3 w-3" /> {event.country} ·{" "}
                <span className="font-mono">{event.source}</span>
              </span>
              <span>{relativeTime(event.timestamp)}</span>
              <span className="ml-auto truncate max-w-[12rem] text-right">
                {event.asset}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
