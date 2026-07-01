"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label className="block space-y-2" htmlFor={inputId}>
        {label ? <span className="text-sm font-semibold text-ink">{label}</span> : null}
        <span
          className={cn(
            "flex h-12 items-center gap-3 rounded-xl border bg-surface/85 px-4 text-sm shadow-inset transition focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10",
            error ? "border-danger/50" : "border-line",
            className
          )}
        >
          {leftIcon ? <span className="text-muted">{leftIcon}</span> : null}
          <input
            id={inputId}
            ref={ref}
            className="w-full min-w-0 bg-transparent text-ink outline-none placeholder:text-muted/70"
            {...props}
          />
          {rightIcon ? <span className="text-muted">{rightIcon}</span> : null}
        </span>
        {error ? <span className="text-xs font-medium text-danger">{error}</span> : null}
      </label>
    );
  }
);

Input.displayName = "Input";
