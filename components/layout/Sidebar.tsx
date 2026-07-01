"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, PanelLeftClose, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { APP_NAME } from "@/constants/appConfig";
import { PRIVATE_NAVIGATION } from "@/constants/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { clearUser } from "@/redux/slices/userSlice";
import { clearLoading } from "@/redux/slices/uiLoadingSlice";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const defaultOpen = useMemo(
    () =>
      PRIVATE_NAVIGATION.filter((item) =>
        item.children?.some((child) => pathname === child.href),
      ).map((item) => item.title),
    [pathname],
  );
  const [expanded, setExpanded] = useState<string[]>(defaultOpen);

  const toggleExpanded = (title: string) => {
    setExpanded((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearUser());
    dispatch(clearLoading());
    onClose();
    router.replace("/");
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-surface/90 px-4 py-5 shadow-card backdrop-blur-glass transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between gap-3 px-2">
          <Link
            className="focus-ring flex items-center gap-3 rounded-full"
            href="/dashboard"
            onClick={onClose}
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white shadow-glow">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight">
                {APP_NAME}
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                CRM suite
              </span>
            </span>
          </Link>
          <Button
            className="lg:hidden"
            size="sm"
            variant="ghost"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-5 rounded-[1.5rem] border border-line bg-background/70 p-4 shadow-inset">
          <div className="flex items-center justify-between text-xs font-black text-muted">
            <span>Workspace score</span>
            <span className="text-primary">86%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/10">
            <span className="block h-full w-[86%] rounded-full bg-primary" />
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {PRIVATE_NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isOpen = expanded.includes(item.title);
            const activeParent =
              pathname === item.href ||
              item.children?.some((child) => pathname === child.href);

            return (
              <div key={item.title} className="space-y-1">
                <button
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-black transition",
                    activeParent
                      ? "bg-primary text-white shadow-glow"
                      : "text-muted hover:bg-primary/10 hover:text-ink",
                  )}
                  type="button"
                  onClick={() => toggleExpanded(item.title)}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition",
                      isOpen ? "rotate-180" : "rotate-0",
                    )}
                  />
                </button>

                {isOpen ? (
                  <div className="ml-4 border-l border-line pl-3 pt-1">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const active = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted hover:bg-primary/5 hover:text-ink",
                          )}
                        >
                          <ChildIcon className="h-4 w-4" />
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="space-y-3">
          {/* <div className="rounded-[1.5rem] border border-primary/15 bg-primary/10 p-4">
            <p className="text-sm font-black text-ink">
              Clean assignment build
            </p>
            <p className="mt-1 text-xs leading-5 text-muted">
              Protected routes, Redux state, Axios services, and custom UI
              components.
            </p>
          </div> */}

          <button
            type="button"
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-black text-danger transition hover:bg-danger/15"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
