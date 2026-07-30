import { apiFetch } from './api';

export type MarketType = 'borsa' | 'kripto' | 'emtia';

export interface StockSummary {
  symbol: string;
  ticker: string;
  currentPrice: number;
  previousClose: number;
  changeAmount: number;
  changePercent: number;
  sparkline: number[];
}

export interface StockDashboard {
  highlights: StockSummary[];
  favorites: StockSummary[];
  recommendations: StockSummary[];
}

export const MARKET_TABS: { key: MarketType; label: string }[] = [
  { key: 'borsa', label: 'Borsa' },
  { key: 'kripto', label: 'Kripto' },
  { key: 'emtia', label: 'Emtia' },
];

function num(value: unknown): number {
  const n = typeof value === 'string' ? Number(value) : value;
  return typeof n === 'number' && Number.isFinite(n) ? n : 0;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** AKBNK.IS → AKBNK ; BTC-USD → BTC ; GC=F → GC */
export function toDisplaySymbol(symbol: string): string {
  return symbol
    .replace(/\.IS$/i, '')
    .replace(/-USD$/i, '')
    .replace(/-TRY$/i, '')
    .replace(/=F$/i, '')
    .trim()
    .toUpperCase();
}

function toSummary(raw: unknown): StockSummary {
  const r = (raw ?? {}) as Record<string, unknown>;
  const ticker = str(r.ticker);
  const symbolRaw = str(r.symbol);
  const symbol = symbolRaw || (ticker ? toDisplaySymbol(ticker) : '');

  return {
    symbol,
    ticker: ticker || symbolRaw,
    currentPrice: num(r.current_price ?? r.currentPrice),
    previousClose: num(r.previous_close ?? r.previousClose),
    changeAmount: num(r.change_amount ?? r.changeAmount),
    changePercent: num(r.change_percent ?? r.changePercent),
    sparkline: Array.isArray(r.sparkline) ? r.sparkline.map(num) : [],
  };
}

function toList(value: unknown): StockSummary[] {
  return Array.isArray(value) ? value.map(toSummary).filter((s) => Boolean(s.symbol || s.ticker)) : [];
}

/** Dashboard'daki tüm semboller tek listede, tekilleştirilmiş. */
export function allStocks(d: StockDashboard | undefined | null): StockSummary[] {
  if (!d) return [];
  const seen = new Set<string>();
  return [...d.highlights, ...d.favorites, ...d.recommendations].filter((s) => {
    const key = s.symbol.toUpperCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** GET /api/StockMarket/dashboard — anonim erişime açıktır. */
export async function getMarketDashboard(marketType: MarketType = 'borsa'): Promise<StockDashboard> {
  const data = await apiFetch<Record<string, unknown>>(
    `/api/StockMarket/dashboard?marketType=${marketType}`,
  );
  const root = (data?.data ?? data ?? {}) as Record<string, unknown>;
  return {
    highlights: toList(root.highlights),
    favorites: toList(root.favorites),
    recommendations: toList(root.recommendations),
  };
}

export interface MarketBreadth {
  advancing: number;
  declining: number;
  flat: number;
  averageChange: number;
}

export function computeBreadth(stocks: StockSummary[]): MarketBreadth {
  let advancing = 0;
  let declining = 0;
  let flat = 0;
  let total = 0;

  for (const s of stocks) {
    if (s.changePercent > 0.05) advancing += 1;
    else if (s.changePercent < -0.05) declining += 1;
    else flat += 1;
    total += s.changePercent;
  }

  return {
    advancing,
    declining,
    flat,
    averageChange: stocks.length > 0 ? total / stocks.length : 0,
  };
}

export function formatPrice(value: number, marketType: MarketType): string {
  const digits = marketType === 'kripto' && value < 10 ? 4 : 2;
  return value.toLocaleString('tr-TR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '−';
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}
