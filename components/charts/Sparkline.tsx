interface SparklineProps {
  values: readonly number[];
  height?: number;
}

export function Sparkline({ values, height = 46 }: SparklineProps) {
  const width = 140;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="h-12 w-36 overflow-visible" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend sparkline">
      <polyline fill="none" points={points} stroke="rgb(var(--color-primary))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <circle cx={width} cy={Number(points.split(" ").at(-1)?.split(",")[1] ?? 0)} fill="rgb(var(--color-primary))" r="4" />
    </svg>
  );
}
