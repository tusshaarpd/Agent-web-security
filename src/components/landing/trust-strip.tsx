"use client";

import { motion } from "framer-motion";

const COMPANIES = [
  "Northwind Bank",
  "Helios Health",
  "Quantum Aero",
  "Vermilion Retail",
  "Halcyon Energy",
  "OrionPay",
  "Lumen Logistics",
  "Skyline Insurance"
];

export function TrustStrip() {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl p-6 sm:p-8">
      <p className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Trusted by AI-first teams at regulated enterprises
      </p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {COMPANIES.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center justify-center rounded-lg border border-border/40 bg-background/20 px-4 py-3"
          >
            <span className="text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground transition-colors">
              {c}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
