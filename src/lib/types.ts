/** Shared domain types across the AI security platform. */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type AssetKind =
  | "agent"
  | "model"
  | "rag"
  | "api"
  | "prompt"
  | "tool"
  | "workflow"
  | "mcp";

export interface AIAsset {
  id: string;
  name: string;
  kind: AssetKind;
  vendor: string;
  environment: "production" | "staging" | "development";
  owner: string;
  team: string;
  riskScore: number;
  complianceScore: number;
  lastScanned: string;
  tags: string[];
  description: string;
  region: string;
  permissions: string[];
}

export interface Finding {
  id: string;
  assetId: string;
  title: string;
  category: string;
  severity: Severity;
  confidence: number;
  businessImpact: string;
  technicalExplanation: string;
  attackScenario: string;
  affectedComponent: string;
  remediation: string;
  effort: "low" | "medium" | "high";
  mitre?: string;
  detectedAt: string;
  status: "open" | "in_progress" | "resolved" | "accepted";
}

export interface ThreatEvent {
  id: string;
  asset: string;
  type: string;
  severity: Severity;
  source: string;
  country: string;
  timestamp: string;
  description: string;
  blocked: boolean;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  shortName: string;
  score: number;
  passing: number;
  failing: number;
  total: number;
  description: string;
  controls: ComplianceControl[];
}

export interface ComplianceControl {
  id: string;
  code: string;
  title: string;
  status: "passed" | "failed" | "warning" | "not_applicable";
  evidence?: string;
  owner: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  asset: string;
  status: "active" | "investigating" | "resolved";
  detectedAt: string;
  mttr: string;
  description: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  resource: string;
  timestamp: string;
  outcome: "success" | "failure" | "warning";
}
