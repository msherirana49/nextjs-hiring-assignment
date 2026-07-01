"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  LockKeyhole,
  PhoneCall,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { useAppSelector } from "@/redux/hooks";

const pipelineItems = [
  { label: "Qualified leads", value: "72%" },
  { label: "Open deals", value: "$84k" },
  { label: "Close rate", value: "31%" },
] as const;

const focusTasks = [
  "Omega CRM redesign",
  "Sales funnel audit",
  "Customer segment sync",
] as const;

export function HeroSection() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-ink">
      <AnimatedBackground intensity="strong" />

      <header className="relative z-20 mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          className="focus-ring flex items-center gap-3 rounded-full"
          href="/"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight">Omega CRM</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle compact />
          <Link
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-black text-white shadow-glow transition hover:bg-primary/90"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-4 text-center sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:pb-20 lg:text-left">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto max-w-2xl lg:mx-0"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-4 py-2 text-sm font-black text-primary shadow-inset dark:border-sky-300/35 dark:bg-sky-400/15 dark:text-sky-200">
            <LockKeyhole className="h-4 w-4" />
            Secure CRM workspace
          </span>
          <h1 className="text-[clamp(2.6rem,9vw,5.7rem)] font-extrabold leading-[0.94] tracking-[-0.06em] text-ink">
            <span className="block">Clean pipelines.</span>
            <span className="block text-primary dark:text-sky-300 mt-6">
              Faster CRM
            </span>
            <span className="block text-primary dark:text-sky-300">
              decisions.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8 lg:mx-0">
            A polished Next.js dashboard experience with protected routing,
            Redux-powered state, glassy widgets, and a handcrafted data table.
          </p>
          <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 min-[460px]:grid-cols-3 lg:mx-0">
            {pipelineItems.map((item) => (
              <div
                className="rounded-2xl border border-line bg-surface/80 p-4 shadow-soft backdrop-blur-glass"
                key={item.label}
              >
                <p className="text-[0.68rem] font-black uppercase tracking-[0.3em] text-muted">
                  {item.label}
                </p>
                <p className="mt-2 font-mono text-xl font-black tracking-tight text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto flex w-full max-w-[42rem] flex-col gap-4 sm:h-[40rem] sm:block lg:ml-auto"
          initial={{ opacity: 0, y: 36 }}
          transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute left-1/2 top-1/2 hidden h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:block" />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            className="relative w-full rounded-[2rem] border border-white/70 bg-surface/90 p-4 shadow-card backdrop-blur-glass dark:border-line sm:absolute sm:left-0 sm:top-4 sm:w-[21.75rem] lg:w-[22.5rem]"
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="rounded-[1.5rem] border border-line bg-background/60 p-5">
              <svg
                className="h-32 w-full overflow-visible"
                viewBox="0 0 260 150"
              >
                <path
                  d="M30 124A100 100 0 0 1 230 124"
                  fill="none"
                  stroke="rgb(var(--color-line))"
                  strokeLinecap="round"
                  strokeWidth="42"
                />
                <motion.path
                  animate={{ pathLength: [0, 0.66, 0.66, 0] }}
                  d="M30 124A100 100 0 0 1 230 124"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  stroke="rgb(var(--color-primary))"
                  strokeLinecap="round"
                  strokeWidth="42"
                  transition={{
                    delay: 0.2,
                    duration: 4.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [0, 0.42, 0.76, 1],
                  }}
                />
                <motion.line
                  animate={{ rotate: [-52, 22, 22, -52] }}
                  initial={{ rotate: -52 }}
                  stroke="rgb(var(--color-primary))"
                  strokeLinecap="round"
                  strokeWidth="4"
                  style={{ transformOrigin: "130px 124px" }}
                  transition={{
                    delay: 0.2,
                    duration: 4.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [0, 0.42, 0.76, 1],
                  }}
                  x1="130"
                  x2="130"
                  y1="124"
                  y2="58"
                />
              </svg>
              <div className="mt-1 flex items-end justify-between gap-4 text-left">
                <div>
                  <p className="text-sm font-black text-muted">
                    Total sale value
                  </p>
                  <p className="mt-2 font-mono text-3xl font-black tracking-tight text-ink">
                    $24,386.00
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface px-4 py-3 text-sm font-black shadow-inset">
                <span className="text-primary">↗ 21%</span>
                <span className="text-muted">from last month</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            className="relative w-full rounded-[2rem] border border-line bg-surface/90 p-5 text-left shadow-card backdrop-blur-glass sm:absolute sm:right-0 sm:top-28 sm:w-[17.75rem] lg:w-[18.5rem]"
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted">Team velocity</p>
                <p className="mt-1 font-mono text-2xl font-black">94.2%</p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                <UsersRound className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[84, 68, 92].map((value, index) => (
                <div
                  className="h-2 overflow-hidden rounded-full bg-muted/10"
                  key={value.toString()}
                >
                  <motion.span
                    animate={{ width: [`${Math.max(value - 20, 16)}%`, `${value}%`, `${Math.max(value - 8, 20)}%`, `${value}%`] }}
                    className="block h-full rounded-full bg-secondary"
                    initial={{ width: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            className="relative w-full rounded-[2rem] border border-line bg-surface/90 p-5 text-left shadow-card backdrop-blur-glass sm:absolute sm:bottom-6 sm:left-8 sm:w-[31rem] sm:max-w-[calc(100%-2rem)]"
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute -left-5 top-12 hidden h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-soft backdrop-blur-glass sm:grid">
              <PhoneCall className="h-5 w-5" />
            </span>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted">Pipeline tasks</p>
                <h2 className="text-xl font-black tracking-tight">
                  Today&apos;s focus
                </h2>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </span>
            </div>
            <div className="grid gap-3">
              {focusTasks.map((item, index) => (
                <div
                  className="flex items-center gap-3 rounded-2xl border border-line bg-background/70 p-3"
                  key={item}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-black text-ink sm:text-base">
                    {item}
                  </span>
                  <span className="hidden h-8 w-8 overflow-hidden rounded-full bg-primary/10 sm:block">
                    <Image
                      alt="CRM team member"
                      className="object-cover"
                      height={32}
                      src="/images/hero-crm-reference.png"
                      width={32}
                    />
                  </span>
                  <span className="font-mono text-xs font-black text-muted">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
