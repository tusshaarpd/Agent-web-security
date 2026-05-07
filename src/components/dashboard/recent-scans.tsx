"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RECENT_SCANS } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

export function RecentScans() {
  return (
    <div className="space-y-2">
      {RECENT_SCANS.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 p-3 hover:bg-background/60 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300">
            <Cpu className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{s.asset}</p>
            <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="font-mono">{s.id}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {s.duration}
              </span>
              <span>{relativeTime(s.timestamp)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{s.findings} issues</Badge>
            {s.critical > 0 && (
              <Badge variant="critical">{s.critical} critical</Badge>
            )}
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
