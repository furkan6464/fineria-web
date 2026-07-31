import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Activity,
  ArrowRight,
  BrainCircuit,
  Database,
  Gauge,
  Lock,
  MessageCircle,
  Minus,
  Newspaper,
  RefreshCw,
  Sparkles,
  TrendingDown,
  TrendingUp,
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

const SIGNAL_CARDS = [
  {
    key: 'al',
    label: 'Al',
    meaning: 'Yükseliş',
    desc: 'Yukarı yön ihtimali öne çıkar. Güven skoru ve göstergelerle birlikte okuyun.',
    tone: 'up' as const,
  },
  {
    key: 'tut',
    label: 'Tut',
    meaning: 'Nötr',
    desc: 'Belirgin bir yön yok. Beklemek veya pozisyonu korumak daha dengeli bir okuma.',
    tone: 'flat' as const,
  },
  {
    key: 'sat',
    label: 'Sat',
    meaning: 'Düşüş',
    desc: 'Aşağı yön ihtimali öne çıkar. Yatırım tavsiyesi değil; veriye dayalı görünüm.',
    tone: 'down' as const,
  },
] as const;

const DATA_INPUTS = [
  {
    icon: Database,
    title: 'Fiyat & hacim',
    text: 'Geçmiş fiyat serisi ve işlem hacmi modelin temel girdisidir.',
  },
  {
    icon: Activity,
    title: 'Teknik göstergeler',
    text: 'RSI, MACD ve benzeri göstergeler bağlam katmanı sağlar.',
  },
  {
    icon: Newspaper,
    title: 'Haber verileri',
    text: 'Şirket ve piyasa haberleri duyarlılık sinyali olarak modele girer.',
  },
  {
    icon: MessageCircle,
    title: 'Sosyal akış',
    text: 'Topluluk ve sosyal tartışma nabzı yön görünümünü destekler.',
  },
] as const;

const PIPELINE = [
  {
    icon: Database,
    title: 'Çok katmanlı girdi',
    text: 'Fiyat, teknik, haber ve sosyal akış bir araya gelir.',
  },
  {
    icon: BrainCircuit,
    title: 'Attention-LSTM',
    text: 'Model zaman içindeki kalıpları öğrenir ve skor üretir.',
  },
  {
    icon: Sparkles,
    title: 'Al · Sat · Tut',
    text: 'Çıktı net bir yön görünümüne dönüşür.',
  },
];

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

function HowItWorks() {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
          Mantık
        </p>
        <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
          Tahminleme nasıl çalışır?
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--ink-500)' }}>
          Motor yalnızca fiyatı okumaz. Geçmiş veri, teknik göstergeler, haber
          duyarlılığı ve sosyal akış birlikte işlenerek Al / Sat / Tut görünümü
          üretilir. Aşağıdaki kartlar örnek çıktı dilidir — canlı sonuç
          hesabınıza bağlı çalışır.
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--border-subtle)] sm:mb-10">
        {SIGNAL_CARDS.map((card, i) => {
          const toneColor =
            card.tone === 'up' ? 'var(--success)' : card.tone === 'down' ? 'var(--danger)' : 'var(--ink-500)';
          return (
            <motion.article
              key={card.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:gap-8 sm:px-6 sm:py-6 ${
                i < SIGNAL_CARDS.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
              }`}
            >
              <div className="flex min-w-[7.5rem] items-baseline gap-3 sm:flex-col sm:gap-1">
                <span
                  className="font-mono text-2xl font-bold tracking-tight sm:text-[1.75rem]"
                  style={{ color: toneColor }}
                >
                  {card.label}
                </span>
                <span className="text-xs font-medium" style={{ color: 'var(--ink-400)' }}>
                  {card.meaning}
                </span>
              </div>
              <p className="max-w-xl text-sm leading-relaxed sm:pt-1" style={{ color: 'var(--ink-500)' }}>
                {card.desc}
              </p>
            </motion.article>
          );
        })}
      </div>

      <div className="mb-5 sm:mb-6">
        <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>
          Modele giren veriler
        </h3>
        <p className="text-sm" style={{ color: 'var(--ink-500)' }}>
          Tahminleme dört veri katmanını birleştirir.
        </p>
      </div>
      <div className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-2 lg:grid-cols-4">
        {DATA_INPUTS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5"
          >
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
            >
              <item.icon size={18} />
            </div>
            <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{item.title}</div>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-5 sm:p-8">
        <h3 className="mb-6 text-sm font-semibold sm:mb-8" style={{ color: 'var(--ink-900)' }}>
          Veriden sinyale
        </h3>
        <div className="grid gap-4 sm:grid-cols-3 lg:gap-3">
          {PIPELINE.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="relative rounded-2xl bg-white p-4 ring-1 ring-[var(--border-subtle)]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
                >
                  <step.icon size={16} />
                </div>
                <span className="font-mono text-[10px] font-semibold" style={{ color: 'var(--ink-400)' }}>
                  0{i + 1}
                </span>
              </div>
              <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{step.title}</div>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{step.text}</p>
              {i < PIPELINE.length - 1 && (
                <ArrowRight
                  size={14}
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[var(--ink-400)] sm:block"
                  aria-hidden
                />
              )}
            </motion.div>
          ))}
        </div>
        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed sm:mt-6" style={{ color: 'var(--amber)' }}>
          <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
          Model çıktısı bilgilendirme amaçlıdır; yatırım tavsiyesi değildir. Karar her zaman size aittir.
        </p>
      </div>
    </section>
  );
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
      <div className="mb-1 flex items-center gap-2">
        <Gauge size={16} style={{ color: 'var(--brand-hover)' }} />
        <h3 className="text-base font-bold" style={{ color: 'var(--ink-900)' }}>Risk profiliniz</h3>
      </div>
      <p className="mb-6 text-sm" style={{ color: 'var(--ink-500)' }}>
        Yanıtlarınız yalnızca bu ekranda hesaplanır, hiçbir yere gönderilmez.
      </p>

      <AnimatePresence mode="wait">
        {!profile ? (
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <div className="mb-6 flex gap-2">
              {RISK_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{ background: i <= step ? 'var(--brand)' : 'var(--border-subtle)' }}
                />
              ))}
            </div>
            <p className="mb-5 text-base font-medium" style={{ color: 'var(--ink-900)' }}>{RISK_QUESTIONS[step].q}</p>
            <div className="flex flex-col gap-2.5">
              {RISK_QUESTIONS[step].opts.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="rounded-xl border border-[var(--border-subtle)] px-4 py-3 text-left text-sm font-medium transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
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
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-bold"
              style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
            >
              {profile.type[0]}
            </div>
            <div className="mb-2 text-xl font-bold" style={{ color: 'var(--ink-900)' }}>{profile.type}</div>
            <p className="mb-5 text-sm" style={{ color: 'var(--ink-500)' }}>{profile.desc}</p>
            <button type="button" onClick={reset} className="mx-auto flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--brand-hover)' }}>
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
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'var(--brand-tint)' }}>
          <Lock size={24} style={{ color: 'var(--brand-hover)' }} />
        </div>
        <h3 className="mb-2 text-lg font-bold" style={{ color: 'var(--ink-900)' }}>
          Canlı tahmin için giriş yapın
        </h3>
        <p className="mx-auto mb-6 max-w-sm text-sm" style={{ color: 'var(--ink-500)' }}>
          Tahminleme motoru hesabınıza bağlı çalışır. Ücretsiz hesap açarak
          desteklenen semboller için model çıktısını görebilirsiniz.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/kayit" className="btn-primary inline-flex items-center gap-2 text-sm">
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
      <div className="card flex flex-col items-center gap-5 p-10">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4" style={{ borderColor: 'var(--brand) transparent transparent transparent' }} />
          <div className="absolute inset-3 flex items-center justify-center rounded-full" style={{ background: 'var(--brand-tint)' }}>
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
        <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>Tahmin alınamadı</p>
        <p className="mb-5 text-sm" style={{ color: 'var(--ink-500)' }}>
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
        <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>Model bulunamadı</p>
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
          className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium disabled:opacity-60"
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
          <div className="h-2.5 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
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

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([
          ['Güven', confidencePct !== null ? `%${confidencePct}` : '—'],
          ['Fiyat', data.currentPrice !== null ? data.currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : '—'],
          ['RSI', data.rsi !== null ? data.rsi.toFixed(1) : '—'],
          ['MACD', data.macd ?? '—'],
        ] as const).map(([label, value]) => (
          <div key={label} className="rounded-xl bg-[var(--bg-subtle)] p-3 text-center">
            <div className="mb-1 text-[11px]" style={{ color: 'var(--ink-500)' }}>{label}</div>
            <div className="font-mono text-sm font-bold" style={{ color: 'var(--ink-900)' }}>{value}</div>
          </div>
        ))}
      </div>

      {data.explanation && (
        <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {data.explanation}
        </p>
      )}

      <div className="flex items-start gap-2 rounded-xl bg-[#FFFBEB] p-3 text-xs" style={{ color: 'var(--amber)' }}>
        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
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
          className="mb-10 pt-6 sm:mb-12 sm:pt-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--brand-hover)' }}>
            Fineria Finance Tahminleme
          </p>
          <h1 className="mt-2 text-responsive-section font-extrabold" style={{ color: 'var(--ink-900)' }}>
            Fiyat yönünü veriyle okuyun
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg" style={{ color: 'var(--ink-500)' }}>
            Model fiyat, teknik göstergeler, haber duyarlılığı ve sosyal akışı
            birlikte okuyarak Al, Sat veya Tut görünümü üretir.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] sm:text-sm" style={{ color: 'var(--ink-500)' }}>
            <span className="flex items-center gap-1.5">
              <BrainCircuit size={15} style={{ color: 'var(--brand-hover)' }} />
              Attention-LSTM mimarisi
            </span>
            <span className="flex items-center gap-1.5">
              <Newspaper size={15} style={{ color: 'var(--brand-hover)' }} />
              Haber + sosyal girdi
            </span>
            <span className="flex items-center gap-1.5">
              <Activity size={15} style={{ color: 'var(--brand-hover)' }} />
              {SUPPORTED_PREDICTION_SYMBOLS.length} sembol için eğitilmiş model
            </span>
          </div>
        </motion.header>

        <HowItWorks />

        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--ink-900)' }}>
            Canlı deneyin
          </h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: 'var(--ink-500)' }}>
            Sembol seçin, model çıktısını görün. Giriş yaptıktan sonra aktif olur.
          </p>
        </div>

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
                      className="rounded-lg border px-2.5 py-2 font-mono text-xs font-semibold transition-all"
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
