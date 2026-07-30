import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { allStocks, formatPercent, formatPrice, getMarketDashboard } from '@/lib/market';

const MAX_ITEMS = 16;

export function TickerBar() {
  const { data, isLoading } = useQuery({
    queryKey: ['market-dashboard', 'borsa'],
    queryFn: () => getMarketDashboard('borsa'),
    staleTime: 45_000,
    refetchInterval: 60_000,
  });

  const items = useMemo(() => allStocks(data).slice(0, MAX_ITEMS), [data]);

  if (isLoading && items.length === 0) {
    return (
      <div className="border-y py-3 bg-[var(--bg-subtle)]" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex justify-center gap-8 px-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-28 rounded animate-pulse bg-[var(--border-subtle)]" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div
      className="ticker-wrap border-y py-3 bg-[var(--bg-subtle)]"
      style={{ borderColor: 'var(--border-subtle)' }}
      aria-label="Canlı piyasa şeridi"
    >
      <div className="ticker-content">
        {doubled.map((item, i) => {
          const up = item.changePercent >= 0;
          return (
            <div key={`${item.symbol}-${i}`} className="mx-4 inline-flex items-center gap-2 sm:mx-6">
              <span className="font-mono text-xs font-semibold" style={{ color: 'var(--brand-hover)' }}>
                {item.symbol}
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--ink-700)' }}>
                {formatPrice(item.currentPrice, 'borsa')}
              </span>
              <span
                className="flex items-center gap-0.5 text-xs font-semibold"
                style={{ color: up ? 'var(--success)' : 'var(--danger)' }}
              >
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {formatPercent(item.changePercent)}
              </span>
              <span className="ml-4" style={{ color: 'var(--ink-400)' }}>•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
