import { useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { allStocks, formatPercent, formatPrice, getMarketDashboard } from '@/lib/market';
import { useTranslation } from '@/i18n';

const MAX_ITEMS = 16;

export function TickerBar() {
  const { t, numberLocale } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '120px' });

  const { data, isLoading } = useQuery({
    queryKey: ['market-dashboard', 'borsa'],
    queryFn: () => getMarketDashboard('borsa'),
    staleTime: 60_000,
    refetchInterval: inView ? 90_000 : false,
    enabled: inView,
  });

  const items = useMemo(() => allStocks(data).slice(0, MAX_ITEMS), [data]);

  if (!inView || (isLoading && items.length === 0)) {
    return (
      <div
        ref={ref}
        className="border-y bg-[var(--bg-subtle)] py-3"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex justify-center gap-8 px-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-28 animate-pulse rounded bg-[var(--border-subtle)]" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) return <div ref={ref} />;

  const doubled = [...items, ...items];

  return (
    <div
      ref={ref}
      className="ticker-wrap border-y bg-[var(--bg-subtle)] py-3"
      style={{ borderColor: 'var(--border-subtle)' }}
      aria-label={t.ticker.aria}
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
                {formatPrice(item.currentPrice, 'borsa', numberLocale)}
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
