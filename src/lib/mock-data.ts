import type {
  AIAsset,
  AuditEntry,
  ComplianceFramework,
  Finding,
  Incident,
  ThreatEvent
} from "./types";

/**
 * Realistic mock dataset that powers the entire platform.
 * Replace with real APIs when wiring to a backend; the shape is intentionally
 * stable so swapping the data source is a one-line change in `mock-api.ts`.
 */

export const KPI_SCORES = {
  overallRisk: 72,
  compliance: 86,
  modelSafety: 78,
  promptInjection: 64,
  dataLeakage: 41,
  hallucination: 53,
  jailbreak: 47,
  apiVulnerability: 38,
  toolPermission: 71,
  monitoring: 92
};

export const RISK_TREND = [
  { date: "Jan", risk: 68, attacks: 1240, blocked: 1198 },
  { date: "Feb", risk: 71, attacks: 1620, blocked: 1583 },
  { date: "Mar", risk: 75, attacks: 1890, blocked: 1850 },
  { date: "Apr", risk: 69, attacks: 2105, blocked: 2078 },
  { date: "May", risk: 73, attacks: 2340, blocked: 2312 },
  { date: "Jun", risk: 80, attacks: 2680, blocked: 2641 },
  { date: "Jul", risk: 76, attacks: 2950, blocked: 2912 },
  { date: "Aug", risk: 72, attacks: 3120, blocked: 3083 },
  { date: "Sep", risk: 70, attacks: 3340, blocked: 3309 },
  { date: "Oct", risk: 65, attacks: 3580, blocked: 3551 },
  { date: "Nov", risk: 62, attacks: 3720, blocked: 3690 },
  { date: "Dec", risk: 59, attacks: 3890, blocked: 3861 }
];

export const RADAR_PROFILE = [
  { dimension: "Prompt Injection", score: 78, baseline: 60 },
  { dimension: "Data Leakage", score: 62, baseline: 55 },
  { dimension: "Jailbreak", score: 84, baseline: 70 },
  { dimension: "Hallucination", score: 71, baseline: 58 },
  { dimension: "Tool Misuse", score: 66, baseline: 50 },
  { dimension: "Access Control", score: 88, baseline: 75 },
  { dimension: "Compliance", score: 92, baseline: 80 },
  { dimension: "Observability", score: 81, baseline: 65 }
];

export const SEVERITY_DISTRIBUTION = [
  { name: "Critical", value: 14, color: "#f43f5e" },
  { name: "High", value: 32, color: "#f97316" },
  { name: "Medium", value: 58, color: "#f59e0b" },
  { name: "Low", value: 84, color: "#22d3ee" },
  { name: "Info", value: 121, color: "#10b981" }
];

export const HEATMAP_DATA = [
  { category: "Agents", critical: 4, high: 12, medium: 20, low: 30 },
  { category: "LLMs", critical: 3, high: 8, medium: 18, low: 22 },
  { category: "RAG", critical: 5, high: 10, medium: 14, low: 18 },
  { category: "MCP Tools", critical: 2, high: 7, medium: 9, low: 14 },
  { category: "APIs", critical: 1, high: 6, medium: 11, low: 17 },
  { category: "Prompts", critical: 0, high: 4, medium: 8, low: 13 }
];

export const CATEGORY_TRENDS = [
  { week: "W1", injection: 45, leakage: 22, jailbreak: 18, hallucination: 35 },
  { week: "W2", injection: 52, leakage: 28, jailbreak: 25, hallucination: 41 },
  { week: "W3", injection: 38, leakage: 19, jailbreak: 31, hallucination: 38 },
  { week: "W4", injection: 61, leakage: 34, jailbreak: 27, hallucination: 44 },
  { week: "W5", injection: 47, leakage: 25, jailbreak: 22, hallucination: 39 },
  { week: "W6", injection: 56, leakage: 31, jailbreak: 29, hallucination: 47 },
  { week: "W7", injection: 42, leakage: 26, jailbreak: 24, hallucination: 36 }
];

export const ASSETS: AIAsset[] = [
  {
    id: "ag-001",
    name: "Atlas Customer Support Agent",
    kind: "agent",
    vendor: "Internal",
    environment: "production",
    owner: "Mira Patel",
    team: "Customer Operations",
    riskScore: 78,
    complianceScore: 88,
    lastScanned: "2026-05-06T10:24:00Z",
    tags: ["customer-data", "tier-0", "agentic"],
    description:
      "Primary customer-facing agent handling tier-1 support across web, mobile, and Slack.",
    region: "us-east-1",
    permissions: ["read:tickets", "write:replies", "exec:refund_workflow"]
  },
  {
    id: "ag-002",
    name: "Helios Code Review Agent",
    kind: "agent",
    vendor: "Internal",
    environment: "production",
    owner: "Daniel Cho",
    team: "Platform Engineering",
    riskScore: 64,
    complianceScore: 92,
    lastScanned: "2026-05-06T08:11:00Z",
    tags: ["devtools", "github", "agentic"],
    description:
      "Performs PR review, suggests refactors, and gates deployments via GitHub MCP.",
    region: "eu-west-2",
    permissions: ["read:repo", "write:comments", "exec:ci"]
  },
  {
    id: "md-014",
    name: "Orion-7B Fine-tuned",
    kind: "model",
    vendor: "Mistral",
    environment: "production",
    owner: "Sara Lindqvist",
    team: "Applied Research",
    riskScore: 55,
    complianceScore: 79,
    lastScanned: "2026-05-05T19:32:00Z",
    tags: ["fine-tuned", "PII-touched"],
    description:
      "Fine-tuned reasoning model for financial document parsing and summarization.",
    region: "us-west-2",
    permissions: ["read:storage:fin-docs"]
  },
  {
    id: "rg-008",
    name: "Compliance Knowledge RAG",
    kind: "rag",
    vendor: "Internal",
    environment: "production",
    owner: "Wei Zhang",
    team: "Legal & Compliance",
    riskScore: 82,
    complianceScore: 71,
    lastScanned: "2026-05-06T11:02:00Z",
    tags: ["legal", "policy", "vector-store"],
    description:
      "Vectorized policy library powering compliance Q&A, contract review, and audit copilots.",
    region: "us-east-1",
    permissions: ["read:vector_store", "read:policy_repo"]
  },
  {
    id: "mcp-021",
    name: "GitHub MCP Tool",
    kind: "mcp",
    vendor: "Anthropic",
    environment: "production",
    owner: "Daniel Cho",
    team: "Platform Engineering",
    riskScore: 47,
    complianceScore: 90,
    lastScanned: "2026-05-06T07:45:00Z",
    tags: ["mcp", "github"],
    description:
      "Tool surface exposing 38 actions across repositories, issues, and PRs.",
    region: "eu-west-2",
    permissions: ["repo:write", "actions:read", "secrets:read"]
  },
  {
    id: "wf-033",
    name: "Loan Underwriting Workflow",
    kind: "workflow",
    vendor: "Internal",
    environment: "production",
    owner: "Aisha Rahman",
    team: "Risk & Underwriting",
    riskScore: 91,
    complianceScore: 65,
    lastScanned: "2026-05-06T05:20:00Z",
    tags: ["finance", "regulated", "high-risk"],
    description:
      "Multi-step agentic workflow that ingests applicant data, runs scoring models, and drafts decisions.",
    region: "us-east-1",
    permissions: [
      "read:applicants",
      "exec:scoring_model",
      "write:decisions"
    ]
  },
  {
    id: "ap-101",
    name: "Inference Gateway API",
    kind: "api",
    vendor: "Internal",
    environment: "production",
    owner: "Lukas Mendes",
    team: "Infrastructure",
    riskScore: 38,
    complianceScore: 95,
    lastScanned: "2026-05-06T12:14:00Z",
    tags: ["edge", "gateway"],
    description:
      "Public-facing inference router with rate limiting and prompt sanitation.",
    region: "global",
    permissions: ["api:invoke"]
  },
  {
    id: "pr-202",
    name: "Executive Briefing Prompt Pack",
    kind: "prompt",
    vendor: "Internal",
    environment: "staging",
    owner: "Naomi Park",
    team: "Strategy",
    riskScore: 29,
    complianceScore: 88,
    lastScanned: "2026-05-04T16:30:00Z",
    tags: ["prompt-library", "internal"],
    description:
      "Curated system prompts for executive narrative generation and weekly briefings.",
    region: "us-east-1",
    permissions: ["read:prompts"]
  }
];

export const FINDINGS: Finding[] = [
  {
    id: "f-001",
    assetId: "ag-001",
    title: "Indirect prompt injection via uploaded ticket attachments",
    category: "Prompt Injection",
    severity: "critical",
    confidence: 94,
    businessImpact:
      "Attacker can hijack support sessions, exfiltrate customer PII, or trigger refund workflows on behalf of impersonated users.",
    technicalExplanation:
      "Agent ingests text extracted from PDF and image attachments without sanitization. Hidden instructions in OCR text are interpreted with the same trust as the operator.",
    attackScenario:
      "Customer uploads a PDF containing white-on-white text instructing the agent to ignore prior policy and issue a refund. The agent executes the refund workflow as if instructed by an operator.",
    affectedComponent: "atlas/agent.ingest.attachments",
    remediation:
      "Wrap external content in a structured envelope, mark as untrusted, and apply a defense-in-depth classifier before passing to the planner.",
    effort: "medium",
    mitre: "T1566.001",
    detectedAt: "2026-05-06T09:24:00Z",
    status: "open"
  },
  {
    id: "f-002",
    assetId: "wf-033",
    title: "Excessive tool permissions on underwriting workflow",
    category: "Excessive Permissions",
    severity: "high",
    confidence: 88,
    businessImpact:
      "Workflow can write final decisions without a human-in-the-loop gate, increasing regulatory exposure under ECOA and FCRA.",
    technicalExplanation:
      "The agent's role binding includes `write:decisions` directly, bypassing the four-eyes policy enforced by the legacy underwriting service.",
    attackScenario:
      "An adversarial input causes the planner to skip the review step. The agent stores an auto-approved decision before any reviewer sees it.",
    affectedComponent: "loan-underwriting/role-binding",
    remediation:
      "Split the permission into `draft:decisions` and `commit:decisions`, requiring explicit reviewer attestation for the latter.",
    effort: "low",
    mitre: "T1098",
    detectedAt: "2026-05-06T08:12:00Z",
    status: "in_progress"
  },
  {
    id: "f-003",
    assetId: "rg-008",
    title: "RAG poisoning via outdated public corpus",
    category: "RAG Poisoning",
    severity: "high",
    confidence: 81,
    businessImpact:
      "Compliance answers may cite revoked or attacker-controlled guidance, leading to incorrect legal advice surfaced to internal teams.",
    technicalExplanation:
      "Crawler ingests two unauthenticated mirrors of regulatory text. One mirror has not been updated in 14 months and one was modified by an unknown contributor.",
    attackScenario:
      "Adversary submits a PR to the mirror introducing subtly altered penalties. Vector store re-indexes on next run, surfacing the manipulated text in audit responses.",
    affectedComponent: "compliance-rag/sources",
    remediation:
      "Switch to authoritative APIs, sign indexed documents, and add a content-integrity gate before re-indexing.",
    effort: "medium",
    mitre: "T1565.001",
    detectedAt: "2026-05-06T06:30:00Z",
    status: "open"
  },
  {
    id: "f-004",
    assetId: "md-014",
    title: "Sensitive PII present in fine-tuning corpus",
    category: "Data Leakage",
    severity: "high",
    confidence: 92,
    businessImpact:
      "Model may regurgitate names, account numbers, or identifiers in completions, creating GDPR Article 32 exposure.",
    technicalExplanation:
      "Sample of fine-tuning corpus contains ~1.3% records with un-redacted account identifiers and customer names.",
    attackScenario:
      "Membership inference probe extracts training examples with high confidence, exposing customer identifiers.",
    affectedComponent: "orion-7b/training-data",
    remediation:
      "Run the corpus through Presidio-based redaction, retrain with differential privacy noise injection, and add a leakage canary set.",
    effort: "high",
    mitre: "T1530",
    detectedAt: "2026-05-05T22:14:00Z",
    status: "open"
  },
  {
    id: "f-005",
    assetId: "mcp-021",
    title: "MCP tool exposes write access to repository secrets",
    category: "Tool Permission Risk",
    severity: "high",
    confidence: 87,
    businessImpact:
      "An adversarial prompt can rotate, exfiltrate, or destroy production CI secrets, causing outage and credential compromise.",
    technicalExplanation:
      "The MCP manifest grants `secrets:write`, however no caller actually requires it. Tool capability surface should be reduced to `secrets:read`.",
    attackScenario:
      "Prompt injection chains tool calls to read all repo secrets and append them to a public gist.",
    affectedComponent: "github-mcp/manifest",
    remediation:
      "Drop the `secrets:write` scope. Add a tool-level allow-list of safe actions and audit log every invocation.",
    effort: "low",
    detectedAt: "2026-05-06T07:46:00Z",
    status: "open"
  },
  {
    id: "f-006",
    assetId: "ag-002",
    title: "Hallucinated dependency suggestions",
    category: "Hallucination",
    severity: "medium",
    confidence: 73,
    businessImpact:
      "Suggested package names that do not exist on npm/pypi expose engineers to slopsquatting (package confusion) attacks.",
    technicalExplanation:
      "Static analysis flagged 27 prior PRs where the agent suggested package names with no registry presence at suggestion time.",
    attackScenario:
      "Adversary registers the hallucinated package name. Next time the agent suggests it, an engineer installs the malicious package.",
    affectedComponent: "helios/suggester",
    remediation:
      "Validate every package suggestion against the registry before proposing, and block suggestions for unverified names.",
    effort: "low",
    detectedAt: "2026-05-05T18:02:00Z",
    status: "in_progress"
  },
  {
    id: "f-007",
    assetId: "ap-101",
    title: "Missing rate limit on /v1/embed endpoint",
    category: "API Vulnerability",
    severity: "medium",
    confidence: 96,
    businessImpact:
      "Cost-based denial of service. A single tenant can drive embedding spend > $40k/day before throttle kicks in.",
    technicalExplanation:
      "Rate-limit middleware excludes embedding routes due to a stale config flag.",
    attackScenario:
      "Tenant scripts a loop calling /v1/embed, triggering an unscheduled finance review.",
    affectedComponent: "gateway/rate-limit.yml",
    remediation:
      "Apply the standard tier-1 rate limit and add a daily $-budget cap per tenant.",
    effort: "low",
    detectedAt: "2026-05-06T11:51:00Z",
    status: "resolved"
  },
  {
    id: "f-008",
    assetId: "ag-001",
    title: "Jailbreak via DAN-style persona injection",
    category: "Jailbreak",
    severity: "medium",
    confidence: 78,
    businessImpact:
      "Agent can be coerced into producing policy-violating content that would damage brand and create regulatory complaints.",
    technicalExplanation:
      "Probe set successfully bypassed safety policy in 11/100 attempts using nested role-play prompts.",
    attackScenario:
      "Customer in chat asks the agent to role-play as 'DAN', then requests prohibited operational instructions.",
    affectedComponent: "atlas/system-prompt",
    remediation:
      "Add a meta-classifier on agent outputs, harden the system prompt, and add jailbreak fingerprint detection.",
    effort: "medium",
    detectedAt: "2026-05-04T15:09:00Z",
    status: "open"
  },
  {
    id: "f-009",
    assetId: "ag-001",
    title: "Shadow AI: unmanaged plugin invoked from production",
    category: "Shadow AI",
    severity: "low",
    confidence: 69,
    businessImpact:
      "Unsanctioned plugin sends partial conversation context to a third party with no DPA on file.",
    technicalExplanation:
      "Egress logs show 142 calls to api.thirdparty-translate.io originating from the agent runtime.",
    attackScenario:
      "Sensitive customer text is shipped to an unvetted vendor and may be retained for model training.",
    affectedComponent: "atlas/plugins",
    remediation:
      "Block the egress at the proxy and add an approved-plugins policy enforced at runtime.",
    effort: "low",
    detectedAt: "2026-05-03T12:00:00Z",
    status: "open"
  }
];

export const RECENT_SCANS = [
  {
    id: "scan-9981",
    asset: "Atlas Customer Support Agent",
    findings: 12,
    critical: 1,
    duration: "4m 32s",
    status: "completed",
    timestamp: "2026-05-06T12:14:00Z"
  },
  {
    id: "scan-9980",
    asset: "Loan Underwriting Workflow",
    findings: 18,
    critical: 3,
    duration: "8m 04s",
    status: "completed",
    timestamp: "2026-05-06T11:51:00Z"
  },
  {
    id: "scan-9979",
    asset: "Compliance Knowledge RAG",
    findings: 9,
    critical: 0,
    duration: "3m 12s",
    status: "completed",
    timestamp: "2026-05-06T11:02:00Z"
  },
  {
    id: "scan-9978",
    asset: "GitHub MCP Tool",
    findings: 6,
    critical: 0,
    duration: "1m 45s",
    status: "completed",
    timestamp: "2026-05-06T10:24:00Z"
  },
  {
    id: "scan-9977",
    asset: "Helios Code Review Agent",
    findings: 11,
    critical: 1,
    duration: "5m 50s",
    status: "completed",
    timestamp: "2026-05-06T08:11:00Z"
  }
];

export const THREAT_FEED: ThreatEvent[] = [
  {
    id: "te-7711",
    asset: "Atlas Customer Support Agent",
    type: "Prompt Injection",
    severity: "critical",
    source: "203.0.113.42",
    country: "DE",
    timestamp: "2026-05-06T12:13:00Z",
    description: "Indirect injection via uploaded invoice PDF",
    blocked: true
  },
  {
    id: "te-7710",
    asset: "Inference Gateway API",
    type: "Cost-based DoS",
    severity: "high",
    source: "198.51.100.18",
    country: "BR",
    timestamp: "2026-05-06T12:09:00Z",
    description: "Embedding endpoint flooded at 4.2k req/s",
    blocked: true
  },
  {
    id: "te-7709",
    asset: "Helios Code Review Agent",
    type: "Tool Misuse",
    severity: "medium",
    source: "internal",
    country: "US",
    timestamp: "2026-05-06T11:58:00Z",
    description: "Attempted secret read outside allow-list",
    blocked: true
  },
  {
    id: "te-7708",
    asset: "Compliance Knowledge RAG",
    type: "RAG Poisoning",
    severity: "high",
    source: "192.0.2.55",
    country: "RU",
    timestamp: "2026-05-06T11:42:00Z",
    description: "Modified mirror detected on regulatory feed",
    blocked: false
  },
  {
    id: "te-7707",
    asset: "Atlas Customer Support Agent",
    type: "Jailbreak",
    severity: "medium",
    source: "203.0.113.99",
    country: "GB",
    timestamp: "2026-05-06T11:21:00Z",
    description: "DAN persona injection detected",
    blocked: true
  },
  {
    id: "te-7706",
    asset: "Loan Underwriting Workflow",
    type: "Data Exfiltration",
    severity: "critical",
    source: "internal",
    country: "US",
    timestamp: "2026-05-06T10:48:00Z",
    description: "Outbound payload contained applicant SSNs",
    blocked: true
  }
];

export const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    shortName: "SOC2",
    score: 92,
    passing: 78,
    failing: 4,
    total: 86,
    description:
      "Trust services criteria for security, availability, confidentiality, and privacy.",
    controls: [
      {
        id: "soc2-cc6.1",
        code: "CC6.1",
        title: "Logical access controls restrict AI agent permissions",
        status: "passed",
        evidence: "IAM bindings reviewed weekly; agentic role split enforced.",
        owner: "Platform Engineering"
      },
      {
        id: "soc2-cc7.2",
        code: "CC7.2",
        title: "Continuous monitoring of AI inference traffic",
        status: "passed",
        owner: "SecOps"
      },
      {
        id: "soc2-cc8.1",
        code: "CC8.1",
        title: "Change management for prompt updates and model deployments",
        status: "warning",
        evidence: "Pending sign-off for last 2 prompt deployments.",
        owner: "Platform Engineering"
      },
      {
        id: "soc2-pi1.1",
        code: "PI1.1",
        title: "Processing integrity validated for inference outputs",
        status: "failed",
        evidence: "No automated regression tests for output integrity.",
        owner: "Applied Research"
      }
    ]
  },
  {
    id: "gdpr",
    name: "GDPR",
    shortName: "GDPR",
    score: 84,
    passing: 41,
    failing: 5,
    total: 49,
    description:
      "Personal data protection for EU data subjects; covers Articles 5, 25, 30, 32, 35.",
    controls: [
      {
        id: "gdpr-art5",
        code: "Art. 5",
        title: "Lawfulness, fairness, transparency in AI processing",
        status: "passed",
        owner: "Legal"
      },
      {
        id: "gdpr-art25",
        code: "Art. 25",
        title: "Privacy by design in AI systems",
        status: "warning",
        evidence: "Default training corpus retention exceeds 90 days.",
        owner: "Applied Research"
      },
      {
        id: "gdpr-art32",
        code: "Art. 32",
        title: "Security of processing for AI workloads",
        status: "failed",
        evidence: "Sensitive PII detected in Orion-7B fine-tuning data.",
        owner: "Applied Research"
      },
      {
        id: "gdpr-art35",
        code: "Art. 35",
        title: "DPIA completed for high-risk agentic systems",
        status: "passed",
        owner: "Legal"
      }
    ]
  },
  {
    id: "hipaa",
    name: "HIPAA",
    shortName: "HIPAA",
    score: 78,
    passing: 26,
    failing: 6,
    total: 38,
    description:
      "Safeguards for Protected Health Information processed by AI systems.",
    controls: [
      {
        id: "hipaa-164.308",
        code: "§164.308",
        title: "Administrative safeguards for AI workforce",
        status: "passed",
        owner: "Compliance"
      },
      {
        id: "hipaa-164.312",
        code: "§164.312",
        title: "Technical safeguards: encryption of model artifacts",
        status: "warning",
        owner: "Infrastructure"
      },
      {
        id: "hipaa-164.514",
        code: "§164.514",
        title: "De-identification standard for PHI in prompts",
        status: "failed",
        owner: "Applied Research"
      }
    ]
  },
  {
    id: "iso",
    name: "ISO/IEC 27001",
    shortName: "ISO 27001",
    score: 89,
    passing: 102,
    failing: 9,
    total: 114,
    description:
      "Information security management system aligned to AI controls.",
    controls: [
      {
        id: "iso-a5.30",
        code: "A.5.30",
        title: "ICT readiness for business continuity",
        status: "passed",
        owner: "Infrastructure"
      },
      {
        id: "iso-a8.16",
        code: "A.8.16",
        title: "Monitoring activities of AI components",
        status: "passed",
        owner: "SecOps"
      },
      {
        id: "iso-a8.28",
        code: "A.8.28",
        title: "Secure coding practices for AI integrations",
        status: "warning",
        owner: "Platform Engineering"
      }
    ]
  }
];

export const INCIDENTS: Incident[] = [
  {
    id: "INC-2024-09-114",
    title: "Mass prompt injection via uploaded screenshots",
    severity: "critical",
    asset: "Atlas Customer Support Agent",
    status: "investigating",
    detectedAt: "2026-05-06T11:14:00Z",
    mttr: "—",
    description:
      "12 successful injection attempts within 6 minutes from a single tenant."
  },
  {
    id: "INC-2024-09-113",
    title: "Underwriting model approved 3 high-risk applications",
    severity: "high",
    asset: "Loan Underwriting Workflow",
    status: "active",
    detectedAt: "2026-05-06T10:42:00Z",
    mttr: "—",
    description:
      "Auto-approval triggered without reviewer attestation due to permission gap."
  },
  {
    id: "INC-2024-09-112",
    title: "Outbound traffic to unsanctioned translation API",
    severity: "medium",
    asset: "Atlas Customer Support Agent",
    status: "resolved",
    detectedAt: "2026-05-04T19:08:00Z",
    mttr: "1h 41m",
    description:
      "Egress proxy missing rule allowed 142 calls to thirdparty-translate.io."
  },
  {
    id: "INC-2024-09-111",
    title: "Cost-based DoS attempt on inference gateway",
    severity: "high",
    asset: "Inference Gateway API",
    status: "resolved",
    detectedAt: "2026-05-03T14:22:00Z",
    mttr: "32m",
    description: "Embedding endpoint flooded; rate limit hot-patched in prod."
  }
];

export const AUDIT_TRAIL: AuditEntry[] = [
  {
    id: "au-99221",
    actor: "mira.patel@org",
    action: "approved",
    resource: "Atlas Customer Support Agent v3.2.1",
    timestamp: "2026-05-06T11:48:00Z",
    outcome: "success"
  },
  {
    id: "au-99220",
    actor: "system.scanner",
    action: "scan.completed",
    resource: "Loan Underwriting Workflow",
    timestamp: "2026-05-06T11:51:00Z",
    outcome: "warning"
  },
  {
    id: "au-99219",
    actor: "daniel.cho@org",
    action: "policy.updated",
    resource: "Helios system prompt",
    timestamp: "2026-05-06T10:12:00Z",
    outcome: "success"
  },
  {
    id: "au-99218",
    actor: "system.guard",
    action: "blocked.injection",
    resource: "Atlas Customer Support Agent",
    timestamp: "2026-05-06T09:24:00Z",
    outcome: "success"
  },
  {
    id: "au-99217",
    actor: "wei.zhang@org",
    action: "rotated.embedding-key",
    resource: "Compliance Knowledge RAG",
    timestamp: "2026-05-06T08:55:00Z",
    outcome: "success"
  },
  {
    id: "au-99216",
    actor: "naomi.park@org",
    action: "exported.report",
    resource: "Executive Risk Briefing — Q2",
    timestamp: "2026-05-05T22:18:00Z",
    outcome: "success"
  }
];

export const RESPONSIBLE_AI_CHECKLIST = [
  { item: "Documented AI use case inventory", done: true },
  { item: "Risk classification per use case", done: true },
  { item: "Bias and fairness assessment", done: true },
  { item: "Human-in-the-loop for high-impact decisions", done: false },
  { item: "Explainability artifacts published", done: true },
  { item: "Model cards / system cards maintained", done: true },
  { item: "Red-team exercises last 90 days", done: true },
  { item: "Data subject access response automated", done: false },
  { item: "Incident response runbook for AI failures", done: true },
  { item: "Vendor risk reviews for foundation providers", done: true }
];

export const MITRE_TACTICS = [
  { tactic: "Initial Access", count: 18, color: "#f43f5e" },
  { tactic: "Execution", count: 12, color: "#f97316" },
  { tactic: "Persistence", count: 6, color: "#f59e0b" },
  { tactic: "Privilege Escalation", count: 9, color: "#ec4899" },
  { tactic: "Credential Access", count: 11, color: "#8b5cf6" },
  { tactic: "Discovery", count: 14, color: "#22d3ee" },
  { tactic: "Collection", count: 8, color: "#10b981" },
  { tactic: "Exfiltration", count: 7, color: "#0ea5e9" }
];

export const POSTURE_TIMELINE = [
  { quarter: "Q1 '25", baseline: 52, posture: 58 },
  { quarter: "Q2 '25", baseline: 58, posture: 64 },
  { quarter: "Q3 '25", baseline: 62, posture: 71 },
  { quarter: "Q4 '25", baseline: 65, posture: 76 },
  { quarter: "Q1 '26", baseline: 68, posture: 81 },
  { quarter: "Q2 '26", baseline: 72, posture: 86 }
];

export const BENCHMARK = [
  { peer: "You", overall: 86, fill: "#8b5cf6" },
  { peer: "Industry Avg", overall: 71, fill: "#64748b" },
  { peer: "Top Quartile", overall: 91, fill: "#22d3ee" },
  { peer: "Regulated Peers", overall: 78, fill: "#10b981" }
];

export const INFERENCE_TRAFFIC = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  inbound: Math.round(800 + Math.sin(i / 3) * 400 + Math.random() * 280),
  blocked: Math.round(40 + Math.sin(i / 2) * 18 + Math.random() * 12)
}));

export const ATTACK_REPLAY_STEPS = [
  {
    step: 1,
    title: "Reconnaissance",
    description:
      "Adversary probes /v1/agent endpoint with crafted system-prompt extraction queries.",
    tactic: "Discovery"
  },
  {
    step: 2,
    title: "Initial Foothold",
    description:
      "Indirect injection planted in uploaded ticket attachment is parsed by OCR pipeline.",
    tactic: "Initial Access"
  },
  {
    step: 3,
    title: "Privilege Escalation",
    description:
      "Agent planner is convinced to invoke `exec:refund_workflow` with attacker-controlled payload.",
    tactic: "Privilege Escalation"
  },
  {
    step: 4,
    title: "Lateral Movement",
    description:
      "Tool chain reaches Stripe MCP and creates a refund routed to an attacker account.",
    tactic: "Lateral Movement"
  },
  {
    step: 5,
    title: "Containment",
    description:
      "Sentinel Guardrail policy halts the chain, quarantines the session, opens INC-2024-09-114.",
    tactic: "Containment"
  }
];

export const REMEDIATION_PROGRAM = [
  { week: "W1", planned: 12, completed: 9 },
  { week: "W2", planned: 14, completed: 13 },
  { week: "W3", planned: 18, completed: 14 },
  { week: "W4", planned: 16, completed: 15 },
  { week: "W5", planned: 22, completed: 19 },
  { week: "W6", planned: 25, completed: 24 }
];
