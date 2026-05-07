"use client";

import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number;
  label: string;
  size?: number;
}

export function RiskGauge({ score, label, size = 200 }: RiskGaugeProps) {
  const radius = size / 2 - 16;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  const tone =
    score >= 80
      ? "#10b981"
      : score >= 60
      ? "#22d3ee"
      : score >= 40
      ? "#f59e0b"
      : "#f43f5e";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="risk-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone} stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-muted/40"
          strokeWidth={10}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#risk-grad)"
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference}` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-5xl font-bold tracking-tight font-mono text-gradient"
        >
          {score}
        </motion.span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
