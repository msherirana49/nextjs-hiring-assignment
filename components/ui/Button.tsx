"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-glow hover:bg-primary/90",
  secondary: "bg-secondary text-white shadow-soft hover:bg-secondary/90",
  ghost: "bg-transparent text-muted hover:bg-primary/10 hover:text-primary",
  danger: "bg-danger text-white shadow-soft hover:bg-danger/90",
  outline: "border border-line bg-surface text-ink shadow-soft hover:border-primary/40 hover:text-primary"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 rounded-md px-3 text-sm",
  md: "h-11 gap-2.5 rounded-lg px-4 text-sm",
  lg: "h-[3.25rem] gap-3 rounded-xl px-6 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
