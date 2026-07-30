import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Sparkles, TrendingUp, TrendingDown, Minus, AlertCircle, RefreshCw,
  Lock, Activity, BrainCircuit, Gauge, ArrowRight,
} from 'lucide-react';
import { AppMockupImage } from '@/components/AppMockupImage';
import tahminlemeMockup from '@/assets/app-mockups/tahminleme.svg';
import tahminleme2Mockup from '@/assets/app-mockups/tahminleme-2.svg';
import { useAuthStore } from '@/stores/authStore';
import {
  getPrediction,
  PREDICTION_DISCLAIMER,
  SUPPORTED_PREDICTION_SYMBOLS,
  DEFAULT_PREDICTION_SYMBOL,
  type AiPrediction,
} from '@/lib/prediction';

const RISK_QUESTIONS = [
  { q: 'Yatırım deneyiminiz nedir?', opts: ['Hiç yok', '1-3 yıl', '3-7 yıl', '7+ yıl'] },
  { q: 'Portföyünüz %20 değer kaybederse ne yaparsınız?', opts: ['Hepsini satarım', 'Bir kısmını satarım', 'Beklerim', 'Daha fazla alırım'] },
  { q: 'Yatırım ufkunuz nedir?', opts: ['6 aydan az', '1-2 yıl', '3-5 yıl', '5+ yıl'] },
  { q: 'Risk toleransınızı nasıl tanımlarsınız?', opts: ['Çok düşük', 'Düşük', 'Orta', 'Yüksek'] },
];

const RISK_PROFILES = [
  { max: 4, type: 'Muhafazakâr', desc: 'Düşük risk ve istikrarlı getiri odaklısınız.' },
  { max: 8, type: 'Dengeli', desc: 'Risk ve getiriyi dengeli yönetiyorsunuz.' },
  { max: 12, type: 'Büyüme Odaklı', desc: 'Yüksek getiri potansiyelini tercih ediyorsunuz.' },
  { max: 16, type: 'Agresif', desc: 'Maksimum getiri için yüksek risk alıyorsunuz.' },
];

function trendTone(prediction: AiPrediction) {
  const t = (prediction.trend ?? prediction.signalLabel ?? '').toLowerCase();
  if (t.includes('yüksel') || t.includes('up') || t.includes('al')) return 'up' as const;
  if (t.includes('düş') || t.includes('down') || t.includes('sat')) return 'down' as const;
  return 'flat' as const;
}

function RiskProfileCard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [profile, setProfile] = useState<{ type: string; desc: string } | null>(null);

  const handleAnswer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (step + 1 < RISK_QUESTIONS.length) {
      setStep(step + 1);
      return;
    }
    const score = next.reduce((a, b) => a + b, 0);
    const found = RISK_PROFILES.find((p) => score <= p.max) ?? RISK_PROFILES[1];
    setProfile({ type: found.type, desc: found.desc });
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setProfile(null);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Gauge size={16} style={{ color: 'var(--brand-hover)' }} />
        <h3 className="font-bold text-base" style={{ color: 'var(--ink-900)' }}>Risk profiliniz</h3>
      </div>
      <p className="text-sm mb-6" style={{ color: 'var(--ink-500)' }}>
        Yanıtlarınız yalnızca bu ekranda hesaplanır, hiçbir yere gönderilmez.
      </p>

      <AnimatePresence mode="wait">
        {!profile ? (
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <div className="flex gap-2 mb-6">
              {RISK_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{ background: i <= step ? 'var(--brand)' : 'var(--border-subtle)' }}
                />
              ))}
            </div>
            <p className="text-base font-medium mb-5" style={{ color: 'var(--ink-900)' }}>{RISK_QUESTIONS[step].q}</p>
            <div className="flex flex-col gap-2.5">
              {RISK_QUESTIONS[step].opts.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                  style={{ color: 'var(--ink-700)' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} className="text-center">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold"
              style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
            >
              {profile.type[0]}
            </div>
            <div className="text-xl font-bold mb-2" style={{ color: 'var(--ink-900)' }}>{profile.type}</div>
            <p className="text-sm mb-5" style={{ color: 'var(--ink-500)' }}>{profile.desc}</p>
            <button type="button" onClick={reset} className="text-sm flex items-center gap-2 mx-auto font-medium" style={{ color: 'var(--brand-hover)' }}>
              <RefreshCw size={14} /> Tekrar dene
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PredictionPanel({ symbol }: { symbol: string }) {
  const token = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['ai-predict', symbol, token],
    queryFn: () => getPrediction(symbol, token as string),
    enabled: Boolean(isAuthenticated && token),
    staleTime: 5 * 60_000,
    retry: 0,
  });

  if (!isAuthenticated) {
    return (
      <div className="card p-10 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--brand-tint)' }}>
          <Lock size={24} style={{ color: 'var(--brand-hover)' }} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--ink-900)' }}>
          Canlı tahmin için giriş yapın
        </h3>
        <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--ink-500)' }}>
          Tahminleme motoru hesabınıza bağlı çalışır. Ücretsiz hesap açarak
          desteklenen semboller için model çıktısını görebilirsiniz.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/kayit" className="btn-primary text-sm inline-flex items-center gap-2">
            Ücretsiz Hesap Aç
            <ArrowRight size={15} />
          </Link>
          <Link to="/giris" className="btn-secondary text-sm">Giriş Yap</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-10 flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 animate-spin" style={{ borderColor: 'var(--brand) transparent transparent transparent' }} />
          <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-tint)' }}>
            <Sparkles size={18} style={{ color: 'var(--brand-hover)' }} />
          </div>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--ink-700)' }}>{symbol} analiz ediliyor...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="card p-10 text-center">
        <AlertCircle size={24} className="mx-auto mb-3" style={{ color: 'var(--amber)' }} />
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>Tahmin alınamadı</p>
        <p className="text-sm mb-5" style={{ color: 'var(--ink-500)' }}>
          Tahminleme servisi şu an yanıt vermiyor. Kısa süre sonra tekrar deneyin.
        </p>
        <button type="button" onClick={() => refetch()} className="btn-secondary text-sm">Tekrar dene</button>
      </div>
    );
  }

  if (!data.isModelAvailable) {
    return (
      <div className="card p-10 text-center">
        <AlertCircle size={24} className="mx-auto mb-3" style={{ color: 'var(--amber)' }} />
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>Model bulunamadı</p>
        <p className="text-sm" style={{ color: 'var(--ink-500)' }}>
          {data.message ?? `${symbol} için eğitilmiş bir model bulunmuyor.`}
        </p>
      </div>
    );
  }

  const tone = trendTone(data);
  const toneColor = tone === 'up' ? 'var(--success)' : tone === 'down' ? 'var(--danger)' : 'var(--ink-500)';
  const toneBg = tone === 'up' ? 'var(--success-tint)' : tone === 'down' ? 'var(--danger-tint)' : 'var(--bg-subtle)';
  const ToneIcon = tone === 'up' ? TrendingUp : tone === 'down' ? TrendingDown : Minus;
  const probPct = data.probUp !== null ? Math.round(data.probUp * (data.probUp <= 1 ? 100 : 1)) : null;
  const confidencePct = data.confidence !== null ? Math.round(data.confidence * (data.confidence <= 1 ? 100 : 1)) : null;

  return (
    <div className="card p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-7">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16" style={{ background: toneBg }}>
            <ToneIcon size={28} style={{ color: toneColor }} />
          </div>
          <div>
            <div className="text-xl font-extrabold sm:text-2xl" style={{ color: toneColor }}>
              {data.trend ?? data.signalLabel ?? 'Nötr'}
            </div>
            <div className="text-sm" style={{ color: 'var(--ink-500)' }}>
              {data.timeframe ? `${data.timeframe} görünümü` : 'Fiyat yönü görünümü'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium disabled:opacity-60"
          style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
        >
          <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
          Yenile
        </button>
      </div>

      {probPct !== null && (
        <div className="mb-6 sm:mb-7">
          <div className="mb-2 flex justify-between text-[11px] sm:text-xs" style={{ color: 'var(--ink-500)' }}>
            <span>Düşüş</span>
            <span className="font-mono font-semibold" style={{ color: 'var(--ink-900)' }}>%{probPct} yükseliş</span>
            <span>Yükseliş</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden bg-[var(--bg-subtle)]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: toneColor }}
              initial={{ width: '50%' }}
              animate={{ width: `${probPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {([
          ['Güven', confidencePct !== null ? `%${confidencePct}` : '—'],
          ['Fiyat', data.currentPrice !== null ? data.currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : '—'],
          ['RSI', data.rsi !== null ? data.rsi.toFixed(1) : '—'],
          ['MACD', data.macd ?? '—'],
        ] as const).map(([label, value]) => (
          <div key={label} className="rounded-xl p-3 text-center bg-[var(--bg-subtle)]">
            <div className="text-[11px] mb-1" style={{ color: 'var(--ink-500)' }}>{label}</div>
            <div className="font-mono text-sm font-bold" style={{ color: 'var(--ink-900)' }}>{value}</div>
          </div>
        ))}
      </div>

      {data.explanation && (
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-700)' }}>
          {data.explanation}
        </p>
      )}

      <div className="flex items-start gap-2 p-3 rounded-xl text-xs bg-[#FFFBEB]" style={{ color: 'var(--amber)' }}>
        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
        {data.disclaimer ?? PREDICTION_DISCLAIMER}
      </div>
    </div>
  );
}

export function PredictionPage() {
  const [symbol, setSymbol] = useState<string>(DEFAULT_PREDICTION_SYMBOL);

  return (
    <div className="min-h-screen bg-white pb-16 pt-24 sm:pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 pt-6 sm:mb-10 sm:pt-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--brand-hover)' }}>
            Fineria Tahminleme
          </p>
          <h1 className="mt-2 text-responsive-section font-extrabold" style={{ color: 'var(--ink-900)' }}>
            Fiyat yönünü veriyle okuyun
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg" style={{ color: 'var(--ink-500)' }}>
            Derin öğrenme modelleri geçmiş fiyat hareketlerini ve teknik göstergeleri
            değerlendirerek net bir yön görünümü üretir.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] sm:text-sm" style={{ color: 'var(--ink-500)' }}>
            <span className="flex items-center gap-1.5">
              <BrainCircuit size={15} style={{ color: 'var(--brand-hover)' }} />
              Attention-LSTM mimarisi
            </span>
            <span className="flex items-center gap-1.5">
              <Activity size={15} style={{ color: 'var(--brand-hover)' }} />
              {SUPPORTED_PREDICTION_SYMBOLS.length} sembol için eğitilmiş model
            </span>
          </div>
        </motion.header>

        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="card p-4 sm:p-5">
              <h3 className="mb-4 text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>Sembol seçin</h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                {SUPPORTED_PREDICTION_SYMBOLS.map((s) => {
                  const active = symbol === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSymbol(s)}
                      className="px-2.5 py-2 rounded-lg font-mono text-xs font-semibold transition-all border"
                      style={{
                        background: active ? 'var(--brand-tint)' : 'white',
                        borderColor: active ? '#C7D2FE' : 'var(--border-subtle)',
                        color: active ? 'var(--brand-hover)' : 'var(--ink-500)',
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <RiskProfileCard />
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <PredictionPanel symbol={symbol} />

            <div className="card p-5 sm:p-7">
              <h3 className="mb-5 text-base font-bold" style={{ color: 'var(--ink-900)' }}>
                Uygulama içinde nasıl görünüyor?
              </h3>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="w-[calc(50%-0.5rem)] max-w-[210px] sm:w-auto">
                  <AppMockupImage src={tahminlemeMockup} label="Tahminleme ekranı" width={210} />
                </div>
                <div className="w-[calc(50%-0.5rem)] max-w-[210px] sm:w-auto">
                  <AppMockupImage src={tahminleme2Mockup} label="Analiz detayı" width={210} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
