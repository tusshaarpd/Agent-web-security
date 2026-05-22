"use client";

import Link from "next/link";
import { Plus, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { AssetCard } from "@/components/assets/asset-card";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AssetsPage() {
  const totals = {
    all: ASSETS.length,
    agents: ASSETS.filter((a) => a.kind === "agent").length,
    models: ASSETS.filter((a) => a.kind === "model").length,
    rag: ASSETS.filter((a) => a.kind === "rag").length,
    mcp: ASSETS.filter((a) => a.kind === "mcp").length,
    workflows: ASSETS.filter((a) => a.kind === "workflow").length
  };

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Inventory"
        title="AI Asset Catalog"
        description="Every AI surface in your enterprise — discovered, owned, and continuously assessed."
        action={
          <>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
            <Button asChild size="sm">
              <Link href="/submit">
                <Plus className="h-4 w-4" />
                Submit asset
              </Link>
            </Button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(totals).map(([k, v]) => (
          <Card key={k} className="p-4">
            <CardContent className="p-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {k === "all"
                  ? "All Assets"
                  : k === "rag"
                  ? "RAG Pipelines"
                  : k === "mcp"
                  ? "MCP Tools"
                  : k.charAt(0).toUpperCase() + k.slice(1)}
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono">{v}</span>
                <Badge variant="outline" className="text-[10px]">
                  monitored
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ASSETS.map((a, i) => (
          <AssetCard key={a.id} asset={a} index={i} />
        ))}
      </div>
    </AppShell>
  );
}
