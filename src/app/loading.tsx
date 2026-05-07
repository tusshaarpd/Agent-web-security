import { Logo } from "@/components/brand/logo";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Logo />
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl animate-glow" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
          Loading Sentinel · authenticating session
        </p>
      </div>
    </div>
  );
}
