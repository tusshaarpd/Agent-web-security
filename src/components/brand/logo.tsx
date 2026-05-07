import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-90" />
        <div className="absolute inset-[2px] rounded-[7px] bg-slate-950 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"
              stroke="url(#g)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.5l2 2 4-4"
              stroke="url(#g)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="g" x1="2" y1="2" x2="22" y2="22">
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute -inset-1 rounded-xl bg-violet-500/30 blur-lg opacity-70 -z-10" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-semibold tracking-tight">Sentinel AI</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          AI Security Cloud
        </span>
      </div>
    </div>
  );
}
