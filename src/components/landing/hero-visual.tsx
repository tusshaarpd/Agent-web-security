"use client";

import { motion } from "framer-motion";

/**
 * Animated AI security shield used in the landing hero.
 * Pure SVG + Framer Motion — no images, no external deps.
 */
export function HeroVisual() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      {/* Outer pulsing ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl animate-glow" />

      {/* Orbiting nodes */}
      <motion.div
        className="absolute inset-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]"
            style={{
              transform: `rotate(${deg}deg) translateY(-180px)`
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-16"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[30, 110, 220].map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_2px_rgba(217,70,239,0.6)]"
            style={{ transform: `rotate(${deg}deg) translateY(-120px)` }}
          />
        ))}
      </motion.div>

      {/* Central shield */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 blur-2xl opacity-50" />
          <div className="relative flex h-44 w-44 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl">
            <svg
              viewBox="0 0 80 80"
              className="h-24 w-24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="80" y2="80">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <motion.path
                d="M40 6 L66 16 V36 C66 54 53 68 40 74 C27 68 14 54 14 36 V16 Z"
                stroke="url(#hg)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M30 40 L37 47 L52 32"
                stroke="url(#hg)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Scan line */}
      <div className="absolute inset-12 rounded-full overflow-hidden opacity-50">
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
      </div>

      {/* Floating chips */}
      <motion.div
        className="absolute top-2 -right-4 hidden sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-xl border border-emerald-500/30 bg-slate-950/80 backdrop-blur px-3 py-2 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-emerald-400">
            Posture
          </div>
          <div className="text-lg font-bold text-gradient">A-</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 -left-4 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-xl border border-violet-500/30 bg-slate-950/80 backdrop-blur px-3 py-2 text-xs min-w-[10rem]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-violet-300">
              Threats Blocked
            </span>
          </div>
          <div className="text-lg font-bold font-mono">3,861</div>
          <div className="text-[10px] text-emerald-400">▲ 24% today</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 -left-6 hidden md:block"
        animate={{ x: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur px-3 py-2 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-cyan-300">
            Compliance
          </div>
          <div className="text-lg font-bold text-emerald-400">SOC2 ✓</div>
        </div>
      </motion.div>
    </div>
  );
}
