import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ShieldOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <Logo />
      <div className="mt-10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-500/30 blur-3xl opacity-50" />
        <div className="relative flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10">
            <ShieldOff className="h-7 w-7 text-rose-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="text-gradient">404</span>
          </h1>
          <p className="text-lg font-semibold">Resource not in scope</p>
          <p className="max-w-md text-sm text-muted-foreground">
            The asset, finding, or report you're looking for doesn't exist —
            or your role doesn't grant access. Sentinel logged this request to
            the audit trail.
          </p>
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Go to console</Link>
        </Button>
      </div>
    </div>
  );
}
