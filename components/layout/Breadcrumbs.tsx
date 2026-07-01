"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href: string;
}

const ROUTE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Overview", href: "/dashboard" },
  ],
  "/dashboard/users": [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Users", href: "/dashboard/users" },
  ],
  "/dashboard/settings": [
    { title: "Settings", href: "/dashboard/settings" },
    { title: "Profile", href: "/dashboard/settings" },
  ],
};

function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const routeBreadcrumbs = ROUTE_BREADCRUMBS[pathname];

  if (routeBreadcrumbs) {
    return routeBreadcrumbs;
  }

  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, segments) => ({
      title: titleCase(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    }));
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <nav className="hidden items-center gap-2 text-sm font-semibold text-muted sm:flex" aria-label="Breadcrumbs">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span className="flex items-center gap-2" key={`${item.href}-${item.title}`}>
            {index > 0 ? <ChevronRight className="h-4 w-4" /> : null}
            {isLast ? (
              <span className="text-ink">{item.title}</span>
            ) : (
              <Link className="transition hover:text-primary" href={item.href}>
                {item.title}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
