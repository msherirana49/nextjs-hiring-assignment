import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/charts/Sparkline";

interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  trend: readonly number[];
}

export function KpiCard({ label, value, change, trend }: KpiCardProps) {
  const positive = !change.startsWith("-");

  return (
    <Card className="group overflow-hidden rounded-[1.75rem] bg-surface/90 p-5 backdrop-blur-glass transition hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-muted">{label}</p>
          <p className="mt-3 font-mono text-3xl font-black tracking-tight text-ink">{value}</p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-background/70 text-primary transition group-hover:border-primary/30 group-hover:bg-primary group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className={positive ? "rounded-full bg-success/10 px-3 py-1 font-mono text-sm font-black text-success" : "rounded-full bg-danger/10 px-3 py-1 font-mono text-sm font-black text-danger"}>{change}</span>
        <Sparkline values={trend} />
      </div>
    </Card>
  );
}
