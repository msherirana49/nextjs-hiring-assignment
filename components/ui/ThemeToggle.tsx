"use client";

import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { cn } from "@/utils/cn";

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "focus-ring group inline-flex items-center rounded-full border border-line bg-surface/80 p-1 shadow-soft backdrop-blur-glass transition hover:border-primary/40",
        compact ? "h-10 w-10 justify-center" : "h-11 gap-2 pr-3",
        className
      )}
      type="button"
      onClick={() => dispatch(toggleTheme())}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white shadow-glow transition group-hover:scale-105">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
      {compact ? null : <span className="text-sm font-black text-ink">{isDark ? "Light" : "Dark"}</span>}
    </button>
  );
}
