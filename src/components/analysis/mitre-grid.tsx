"use client";

import { motion } from "framer-motion";

/**
 * Compact MITRE ATLAS-style matrix. Each cell represents a tactic ↔ technique
 * intersection. Color intensity = count of detections in the last 30 days.
 */

const TACTICS = [
  "Recon",
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Esc.",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Collection",
  "Exfiltration"
];

const TECHNIQUES = [
  ["T1591", "T1566", "T1059", "T1547", "T1078", "T1027", "T1110", "T1083", "T1119", "T1041"],
  ["T1592", "T1190", "T1106", "T1098", "T1098", "T1140", "T1212", "T1018", "T1213", "T1567"],
  ["T1593", "T1133", "T1129", "T1136", "T1484", "T1218", "T1003", "T1057", "T1530", "T1029"]
];

const COUNTS = [
  [3, 7, 4, 1, 2, 0, 1, 5, 2, 3],
  [1, 12, 6, 0, 3, 2, 0, 2, 4, 1],
  [0, 4, 2, 1, 0, 1, 5, 1, 1, 0]
];

function intensity(c: number) {
  if (c === 0) return 0.1;
  if (c <= 2) return 0.32;
  if (c <= 5) return 0.55;
  if (c <= 8) return 0.78;
  return 1;
}

export function MitreGrid() {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full border-separate border-spacing-1 text-[11px]">
        <thead>
          <tr>
            {TACTICS.map((t) => (
              <th
                key={t}
                className="text-left px-2 py-1.5 text-muted-foreground font-medium whitespace-nowrap"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TECHNIQUES.map((row, ri) => (
            <tr key={ri}>
              {row.map((tech, ci) => {
                const c = COUNTS[ri][ci];
                const a = intensity(c);
                return (
                  <td key={`${ri}-${ci}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ri * 0.05 + ci * 0.02 }}
                      className="rounded-md px-2 py-2 font-mono border min-w-[3.5rem]"
                      style={{
                        background: `rgba(139,92,246,${a * 0.32})`,
                        borderColor: `rgba(139,92,246,${a * 0.55})`,
                        color: c > 0 ? "white" : "rgb(148,163,184)"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{tech}</span>
                        <span className="text-[10px] opacity-80">{c}</span>
                      </div>
                    </motion.div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
