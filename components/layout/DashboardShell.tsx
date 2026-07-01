"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { cn } from "@/utils/cn";

export function DashboardShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="app-shell relative flex min-h-screen overflow-hidden">
      <AnimatedBackground className="opacity-70" />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={cn("flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72")}>
        <TopNavbar onOpenSidebar={() => setSidebarOpen(true)} />
        <section className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </section>
      </div>
    </main>
  );
}
