import { cn } from "@/utils/cn";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      aria-label="Loading"
      className={cn("inline-flex h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent", className)}
    />
  );
}
