# Sentinel AI — Enterprise AI Security & Governance Platform

A premium, fully-functional Next.js 14 web application for AI security, governance,
and threat intelligence. Built for AI agents, LLMs, RAG pipelines, MCP tools,
ML models, and autonomous workflows.

The app runs entirely on a mock data layer — no backend required. Drop it on
Vercel and it just works.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS** + **ShadCN UI** primitives + Radix
- **Framer Motion** for animations / micro-interactions
- **Recharts** for charts and analytics
- **Lucide Icons**
- **next-themes** for dark/light theming

## Pages

| Route | Description |
| --- | --- |
| `/` | Marketing landing page with hero, features, governance, preview |
| `/dashboard` | KPIs, gauges, radar, heatmap, threat feed, MITRE tactics |
| `/assets` | AI asset catalog (agents, models, RAG, MCP, workflows) |
| `/submit` | 5-step asset submission wizard with simulated scan |
| `/analysis` | Findings, MITRE matrix, attack chain, dep graph, AI remediation |
| `/threats` | Live threat intelligence, forecast, hotspots, emerging TTPs |
| `/simulation` | Adversarial scenario simulation studio + benchmark |
| `/governance` | SOC 2 / GDPR / HIPAA / ISO controls + Responsible AI maturity |
| `/incidents` | Incidents and immutable audit trail |
| `/reports` | Executive briefings + report templates |
| `/copilot` | AI Remediation Copilot with patch generation |
| `/settings` | Workspace, team, integrations, API keys |

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
src/
  app/                 # Next.js routes
  components/
    analysis/          # Findings, MITRE grid, attack flow, dep graph
    assets/            # Asset cards
    brand/             # Logo
    dashboard/         # KPI, gauges, charts, feeds
    landing/           # Hero, feature grid, preview, trust
    shell/             # AppShell, sidebar, topbar
    submit/            # Submission wizard
    ui/                # ShadCN-style primitives
  lib/
    mock-data.ts       # Realistic enterprise dataset
    mock-api.ts        # Async wrappers (swap for real APIs later)
    types.ts           # Shared domain types
    utils.ts           # cn(), format helpers, severity tokens
```

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import the project on [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no environment variables required.

## Customization

- Replace data in `src/lib/mock-data.ts` to match your environment.
- Wire `src/lib/mock-api.ts` to a real backend; call sites are already async.
- Adjust theme tokens in `src/app/globals.css` and `tailwind.config.ts`.

## License

Built for portfolio, demo, and hackathon use.
