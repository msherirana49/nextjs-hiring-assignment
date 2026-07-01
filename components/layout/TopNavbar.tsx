"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search, UserRound } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { clearUser } from "@/redux/slices/userSlice";
import { clearLoading } from "@/redux/slices/uiLoadingSlice";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/utils/cn";

interface TopNavbarProps {
  onOpenSidebar: () => void;
}

export function TopNavbar({ onOpenSidebar }: TopNavbarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = useAppSelector((state) => state.user.profile);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearUser());
    dispatch(clearLoading());
    router.replace("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/80 px-4 py-3 backdrop-blur-glass sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button className="lg:hidden" size="sm" variant="outline" onClick={onOpenSidebar} aria-label="Open sidebar">
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Workspace</p>
            <Breadcrumbs />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search"
            className="focus-ring hidden h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted shadow-soft transition hover:border-primary/40 hover:text-primary sm:grid"
            type="button"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Notifications"
            className="focus-ring hidden h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted shadow-soft transition hover:border-primary/40 hover:text-primary sm:grid"
            type="button"
          >
            <Bell className="h-4 w-4" />
          </button>
          <ThemeToggle compact />

          <div className="relative">
            <button
              className="focus-ring flex items-center gap-3 rounded-xl border border-line bg-surface px-2 py-2 shadow-soft transition hover:border-primary/40"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="object-cover" />
                ) : (
                  <span className="grid h-full w-full place-items-center text-primary">
                    <UserRound className="h-4 w-4" />
                  </span>
                )}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-black leading-4">{profile?.name ?? "Profile"}</span>
                <span className="block text-xs font-semibold text-muted">{profile?.role ?? "Signed in"}</span>
              </span>
            </button>

            <div
              className={cn(
                "absolute right-0 mt-3 w-56 rounded-2xl border border-line bg-surface p-2 shadow-card transition",
                menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="px-3 py-2">
                <p className="text-sm font-black">{profile?.name ?? "User"}</p>
                <p className="truncate text-xs text-muted">{profile?.email ?? "Authenticated session"}</p>
              </div>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-danger transition hover:bg-danger/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
