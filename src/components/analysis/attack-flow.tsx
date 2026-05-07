"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ATTACK_REPLAY_STEPS } from "@/lib/mock-data";

const STEP_TONE = [
  "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "border-amber-500/30 bg-amber-500/10 text-amber-300",
  "border-orange-500/30 bg-orange-500/10 text-orange-300",
  "border-rose-500/30 bg-rose-500/10 text-rose-300",
  "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
];

export function AttackFlow() {
  return (
    <div className="relative">
      <div className="absolute inset-x-6 top-7 h-px bg-gradient-to-r from-violet-500/0 via-fuchsia-500/40 to-cyan-500/0" />
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 relative">
        {ATTACK_REPLAY_STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur p-4 h-full">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${STEP_TONE[i]}`}
                >
                  {s.step}
                </span>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.tactic}
                </div>
              </div>
              <div className="mt-3 text-sm font-semibold">{s.title}</div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
            {i < ATTACK_REPLAY_STEPS.length - 1 && (
              <ArrowRight className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
