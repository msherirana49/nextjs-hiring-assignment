import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type BadgeTone = "primary" | "success" | "warning" | "danger" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  muted: "bg-muted/10 text-muted"
};

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", toneClasses[tone], className)} {...props} />;
}
