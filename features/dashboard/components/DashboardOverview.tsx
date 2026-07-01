"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, CircleDollarSign, MousePointer2, ShieldCheck, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBars } from "@/components/charts/ProgressBars";
import { KpiCard } from "./KpiCard";
import { KPI_DATA } from "@/constants/demoData";
import { useAppSelector } from "@/redux/hooks";

const forecastBars = [46, 72, 58, 86, 64, 92, 76] as const;
const activityItems = [
  { label: "Route guard verified", meta: "Auth middleware", icon: ShieldCheck },
  { label: "Users table refreshed", meta: "Redux loading", icon: UsersRound },
  { label: "Revenue widget synced", meta: "Axios service", icon: CircleDollarSign }
] as const;

export function DashboardOverview() {
  const profile = useAppSelector((state) => state.user.profile);
  const userStatus = useAppSelector((state) => state.user.status);
  const loading = userStatus === "loading";

  return (
    <div className="space-y-6">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/90 p-6 shadow-soft backdrop-blur-glass sm:p-8"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute right-[-7rem] top-[-9rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">Dashboard</p>
            <h1 className="mt-3 text-title font-black text-ink">Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              A cleaner control center for revenue, users, widgets, and session status using the centralized Tailwind design system.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-[1.5rem] border border-line bg-background/70 p-2 shadow-inset">
            {[UsersRound, CircleDollarSign, Activity].map((Icon, index) => (
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-primary shadow-soft" key={index.toString()}>
                <Icon className="h-5 w-5" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="dashboard-grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_DATA.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            key={item.label}
            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
          >
            <KpiCard {...item} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.78fr]">
        <Card className="min-h-[25rem] overflow-hidden rounded-[2rem] bg-surface/90 p-6 backdrop-blur-glass">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-muted">Pipeline stages</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Deal momentum</h2>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <BarChart3 className="h-5 w-5" />
            </span>
          </div>
          <ProgressBars />
          <div className="mt-7 rounded-[1.5rem] border border-line bg-background/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-black text-ink">Revenue forecast</p>
              <p className="font-mono text-sm font-black text-success">+18.4%</p>
            </div>
            <div className="flex h-36 items-end gap-3">
              {forecastBars.map((bar, index) => (
                <motion.span
                  animate={{ height: `${bar}%` }}
                  className="flex-1 rounded-t-2xl bg-primary/80"
                  initial={{ height: 0 }}
                  key={`${bar.toString()}-${index.toString()}`}
                  transition={{ delay: 0.2 + index * 0.04, duration: 0.55, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
          {loading ? <p className="mt-6 rounded-xl bg-primary/10 px-4 py-3 text-sm font-bold text-primary">Loading user session…</p> : null}
        </Card>

        <Card className="min-h-[25rem] rounded-[2rem] bg-surface/90 p-6 backdrop-blur-glass">
          <p className="text-sm font-bold text-muted">Live widgets</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">Activity radar</h2>
          <div className="mt-7 grid place-items-center">
            <div className="relative h-64 w-64 rounded-full border border-line bg-primary/5">
              {[34, 50, 66, 82].map((size) => (
                <span
                  className="absolute left-1/2 top-1/2 rounded-full border border-primary/15"
                  key={size.toString()}
                  style={{ height: `${size}%`, width: `${size}%`, transform: "translate(-50%, -50%)" }}
                />
              ))}
              {[
                { left: "49%", top: "14%" },
                { left: "78%", top: "36%" },
                { left: "28%", top: "68%" },
                { left: "60%", top: "82%" }
              ].map((dot, index) => (
                <span className="absolute h-4 w-4 rounded-full bg-primary shadow-glow animate-pulse-soft" key={index.toString()} style={dot} />
              ))}
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-surface text-primary shadow-card">
                <MousePointer2 className="h-6 w-6" />
              </span>
            </div>
          </div>
          <div className="mt-7 space-y-3">
            {activityItems.map((item) => {
              const Icon = item.icon;
              return (
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-background/70 p-3" key={item.label}>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-ink">{item.label}</span>
                    <span className="block text-xs font-semibold text-muted">{item.meta}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
