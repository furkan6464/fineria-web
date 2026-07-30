interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  positive: boolean;
}

const UP = '#059669';
const DOWN = '#DC2626';

export function Sparkline({ data, width = 72, height = 26, positive }: SparklineProps) {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} aria-hidden />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = 2;
  const usableH = height - pad * 2;
  const step = width / (data.length - 1);

  const points = data.map((value, i) => ({
    x: i * step,
    y: pad + (1 - (value - min) / span) * usableH,
  }));

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  const color = positive ? UP : DOWN;
  const gradientId = `spark-${positive ? 'up' : 'down'}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
