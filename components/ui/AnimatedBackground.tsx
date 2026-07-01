"use client";

import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: "soft" | "strong";
}

type PulsePoint = {
  className: string;
  delay: number;
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const pulsePoints: readonly PulsePoint[] = [
  { className: "left-[8%] top-[18%]", delay: 0 },
  { className: "right-[10%] top-[20%]", delay: 1.4 },
  { className: "left-[18%] bottom-[16%]", delay: 2.5 },
  { className: "right-[22%] bottom-[18%]", delay: 3.4 },
];

export function AnimatedBackground({
  className,
  intensity = "soft",
}: AnimatedBackgroundProps) {
  const isStrong = intensity === "strong";

  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.42] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--color-line) / 0.38) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-line) / 0.38) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <motion.div
        className={cx(
          "absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full blur-3xl",
          isStrong ? "bg-primary/18" : "bg-primary/10",
        )}
        animate={{
          x: [0, 32, -18, 0],
          y: [0, -20, 14, 0],
          scale: [1, 1.07, 0.98, 1],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={cx(
          "absolute -right-32 top-0 h-[36rem] w-[36rem] rounded-full blur-3xl",
          isStrong ? "bg-secondary/18" : "bg-secondary/10",
        )}
        animate={{
          x: [0, -34, 20, 0],
          y: [0, 24, -16, 0],
          scale: [1, 0.97, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={cx(
          "absolute bottom-[-14rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-3xl",
          isStrong ? "bg-sky-400/14" : "bg-sky-400/8",
        )}
        animate={{
          x: ["-50%", "calc(-50% + 24px)", "calc(-50% - 24px)", "-50%"],
          y: [0, -18, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {pulsePoints.map((point) => (
        <motion.span
          key={`${point.className}-${point.delay}`}
          className={cx(
            "absolute h-28 w-28 rounded-full border border-primary/25",
            point.className,
          )}
          animate={{
            opacity: [0, 0.32, 0],
            scale: [0.45, 1.4, 2.2],
          }}
          transition={{
            duration: 4.8,
            delay: point.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.svg
        className="absolute -left-40 top-10 h-[44rem] w-[44rem] text-primary/10 dark:text-primary/15"
        fill="none"
        viewBox="0 0 700 700"
      >
        <motion.path
          d="M86 508C170 426 212 356 204 260c-8-97 75-173 170-165 91 8 156 77 154 168-3 111-100 179-219 176-90-3-171 33-223 69Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="42"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0.15, 0.85, 0.55, 0.12],
            rotate: [0, 2, -3, 0],
          }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.42, 0.78, 1],
          }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>

      <motion.svg
        className="absolute right-[-18rem] top-[-8rem] h-[42rem] w-[42rem] text-secondary/10 dark:text-secondary/15"
        fill="none"
        viewBox="0 0 640 640"
      >
        <motion.path
          d="M109 385C160 298 117 197 205 134c93-67 236-33 292 65 56 99 10 221-98 265-106 44-227 12-290-79Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="34"
          initial={{ pathLength: 0.28, opacity: 0.22 }}
          animate={{
            pathLength: [0.28, 1, 0.46, 0.28],
            opacity: [0.2, 0.72, 0.42, 0.2],
            rotate: [0, -5, 4, 0],
            scale: [1, 1.04, 0.98, 1],
          }}
          transition={{
            duration: 17,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 50%, rgb(var(--color-background) / 0.5) 100%)",
        }}
      />
    </div>
  );
}