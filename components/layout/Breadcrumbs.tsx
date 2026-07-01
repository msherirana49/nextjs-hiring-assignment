"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="hidden items-center gap-2 text-sm font-semibold text-muted sm:flex" aria-label="Breadcrumbs">
      <Link className="transition hover:text-primary" href="/dashboard">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <span className="flex items-center gap-2" key={href}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? <span className="text-ink">{titleCase(segment)}</span> : <Link href={href}>{titleCase(segment)}</Link>}
          </span>
        );
      })}
    </nav>
  );
}
