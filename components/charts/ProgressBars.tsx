const bars = [72, 42, 58, 86, 64, 38, 92] as const;

export function ProgressBars() {
  return (
    <div className="space-y-4">
      {bars.map((bar, index) => (
        <div className="flex items-center gap-3" key={`${bar.toString()}-${index.toString()}`}>
          <span className="w-16 text-xs font-bold text-muted">Stage {index + 1}</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted/10">
            <span className="block h-full rounded-full bg-primary" style={{ width: `${bar}%` }} />
          </span>
          <span className="w-10 text-right font-mono text-xs font-black text-ink">{bar}%</span>
        </div>
      ))}
    </div>
  );
}
