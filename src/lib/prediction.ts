import { apiFetch } from './api';

/**
 * Stock AI tarafından desteklenen günlük semboller.
 * Kaynak: Python Stock AI /models/status → supportedDailySymbols.
 */
export const SUPPORTED_PREDICTION_SYMBOLS = [
  'AKBNK', 'ASELS', 'BIMAS', 'EREGL', 'FROTO', 'GARAN',
  'HALKB', 'ISCTR', 'KRDMD', 'PETKM', 'PGSUS', 'SASA',
  'TCELL', 'THYAO', 'TUPRS', 'VAKBN', 'YKBNK',
] as const;

export const DEFAULT_PREDICTION_SYMBOL = 'ASELS';

export interface AiPrediction {
  symbol: string;
  trend: string | null;
  confidence: number | null;
  rsi: number | null;
  macd: string | null;
  ema: number | null;
  recommendation: string | null;
  explanation: string | null;
  signalLabel: string | null;
  currentPrice: number | null;
  probUp: number | null;
  predictedPrice: number | null;
  isModelAvailable: boolean;
  message: string | null;
  disclaimer: string | null;
  timeframe: string | null;
}

function numOrNull(value: unknown): number | null {
  const n = typeof value === 'string' ? Number(value) : value;
  return typeof n === 'number' && Number.isFinite(n) ? n : null;
}

function strOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

/** AKBNK → AKBNK.IS */
function toUpstreamSymbol(symbol: string): string {
  const s = symbol.trim().toUpperCase();
  if (!s || s.includes('.') || s.includes('-') || s.includes('=')) return s;
  return `${s}.IS`;
}

/** GET /api/ai/predict/{symbol} — oturum açık kullanıcılar için. */
export async function getPrediction(symbol: string, token: string): Promise<AiPrediction> {
  const raw = await apiFetch<Record<string, unknown>>(
    `/api/ai/predict/${encodeURIComponent(toUpstreamSymbol(symbol))}`,
    { token },
  );
  const r = ((raw?.data as Record<string, unknown>) ?? raw ?? {}) as Record<string, unknown>;

  return {
    symbol: strOrNull(r.symbol) ?? symbol,
    trend: strOrNull(r.trend),
    confidence: numOrNull(r.confidence),
    rsi: numOrNull(r.rsi),
    macd: strOrNull(r.macd),
    ema: numOrNull(r.ema),
    recommendation: strOrNull(r.recommendation),
    explanation: strOrNull(r.explanation),
    signalLabel: strOrNull(r.signalLabel),
    currentPrice: numOrNull(r.currentPrice),
    probUp: numOrNull(r.probUp),
    predictedPrice: numOrNull(r.predictedPrice),
    isModelAvailable: r.isModelAvailable !== false,
    message: strOrNull(r.message),
    disclaimer: strOrNull(r.disclaimer),
    timeframe: strOrNull(r.timeframe),
  };
}

export const PREDICTION_DISCLAIMER =
  'Bu çıktı yatırım tavsiyesi değildir; model tahminidir.';
