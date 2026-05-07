import { AppShell } from "@/components/shell/app-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SubmissionWizard } from "@/components/submit/submission-wizard";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function SubmitPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Onboarding"
        title="Submit AI Asset for Review"
        description="Onboard an agent, model, RAG pipeline, MCP tool, or workflow. Sentinel will profile, scan, and continuously monitor it."
        action={
          <Badge variant="cyber">
            <Sparkles className="h-3 w-3" /> AI-assisted intake
          </Badge>
        }
      />
      <div className="mt-6">
        <SubmissionWizard />
      </div>
    </AppShell>
  );
}
