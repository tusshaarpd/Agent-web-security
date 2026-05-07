import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/15 text-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground border-border",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
        warning:
          "border-amber-500/20 bg-amber-500/10 text-amber-500",
        critical:
          "border-rose-500/30 bg-rose-500/10 text-rose-500",
        high: "border-orange-500/30 bg-orange-500/10 text-orange-500",
        medium: "border-amber-500/30 bg-amber-500/10 text-amber-500",
        low: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
        info: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        cyber:
          "border-cyan-500/30 bg-slate-950/40 text-cyan-300 backdrop-blur"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
