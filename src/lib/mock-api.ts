/**
 * Thin async wrappers around the mock data layer.
 * Replace these with real HTTP/RPC calls when the backend is ready —
 * call sites only depend on these signatures.
 */

import {
  ASSETS,
  AUDIT_TRAIL,
  COMPLIANCE_FRAMEWORKS,
  FINDINGS,
  INCIDENTS,
  RECENT_SCANS,
  THREAT_FEED
} from "./mock-data";
import type {
  AIAsset,
  AuditEntry,
  ComplianceFramework,
  Finding,
  Incident,
  ThreatEvent
} from "./types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function listAssets(): Promise<AIAsset[]> {
  await delay();
  return ASSETS;
}

export async function getAsset(id: string): Promise<AIAsset | undefined> {
  await delay();
  return ASSETS.find((a) => a.id === id);
}

export async function listFindings(assetId?: string): Promise<Finding[]> {
  await delay();
  return assetId ? FINDINGS.filter((f) => f.assetId === assetId) : FINDINGS;
}

export async function listThreats(): Promise<ThreatEvent[]> {
  await delay();
  return THREAT_FEED;
}

export async function listFrameworks(): Promise<ComplianceFramework[]> {
  await delay();
  return COMPLIANCE_FRAMEWORKS;
}

export async function listIncidents(): Promise<Incident[]> {
  await delay();
  return INCIDENTS;
}

export async function listAudit(): Promise<AuditEntry[]> {
  await delay();
  return AUDIT_TRAIL;
}

export async function listRecentScans() {
  await delay();
  return RECENT_SCANS;
}
