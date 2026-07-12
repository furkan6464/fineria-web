import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Zap, AlertCircle, RefreshCw } from 'lucide-react';

const stocks = ['AKBNK', 'THYAO', 'CCOLA', 'EREGL', 'TOASO', 'BTC-USD', 'ETH-USD'];

interface Prediction {
  symbol: string;
  prediction_label: 'UP' | 'DOWN';
  probability: number;
  last_close: number;
}

function generatePrediction(symbol: string): Prediction {
  const isUp = Math.random() > 0.42;
  const prob = isUp ? 0.55 + Math.random() * 0.35 : 0.15 + Math.random() * 0.35;
  const prices: Record<string, number> = {
    AKBNK: 52.40, THYAO: 287.40, CCOLA: 71.50,
    EREGL: 48.90, TOASO: 168.50, 'BTC-USD': 67500, 'ETH-USD': 3640,
  };

  return {
    symbol,
    prediction_label: isUp ? 'UP' : 'DOWN',
    probability: parseFloat(prob.toFixed(4)),
    last_close: prices[symbol] ?? 100,
  };
}

function RiskProfile() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [profile, setProfile] = useState<null | { type: string; desc: string }>(null);

  const questions = [
    { q: 'Yatırım deneyiminiz nedir?', opts: ['Hiç yok', '1-3 yıl', '3-7 yıl', '7+ yıl'] },
    { q: 'Portföyünüzün %20 değer kaybetmesi sizi nasıl etkiler?', opts: ['Hepsini satarım', 'Bir kısmını satarım', 'Beklerim', 'Daha fazla alırım'] },
    { q: 'Yatırım ufkunuz nedir?', opts: ['6 aydan az', '1-2 yıl', '3-5 yıl', '5+ yıl'] },
    { q: 'Risk toleransınızı nasıl tanımlarsınız?', opts: ['Çok düşük', 'Düşük', 'Orta', 'Yüksek'] },
  ];

  const profiles = [
    { min: 0, max: 4, type: 'Muhafazakâr', desc: 'Düşük risk, istikrarlı getiri odaklısınız.' },
    { min: 5, max: 8, type: 'Dengeli', desc: 'Risk ve getiriyi dengeli yönetiyorsunuz.' },
    { min: 9, max: 12, type: 'Büyüme Odaklı', desc: 'Yüksek getiri potansiyelini tercih ediyorsunuz.' },
    { min: 13, max: 16, type: 'Agresif', desc: 'Maksimum getiri için yüksek risk alıyorsunuz.' },
  ];

  const handleAnswer = (i: number) => {
    const newAnswers = [...answers, i];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const score = newAnswers.reduce((a, b) => a + b, 0);
      const p = profiles.find(p => score >= p.min && score <= p.max) ?? profiles[1];
      setProfile({ type: p.type, desc: p.desc });
    }
  };

  return (
    <div className="card p-6">
      <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--ink-900)' }}>Risk Profiliniz</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--ink-500)' }}>
        Size özel öneriler için birkaç soru.
      </p>

      <AnimatePresence mode="wait">
        {!profile ? (
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
            <div className="flex gap-2 mb-6">
              {questions.map((_, i) => (
                <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-500" style={{ background: i <= step ? 'var(--brand)' : 'var(--border-subtle)' }} />
              ))}
            </div>

            <p className="text-base font-medium mb-5" style={{ color: 'var(--ink-900)' }}>{questions[step].q}</p>
            <div className="flex flex-col gap-3">
              {questions[step].opts.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i)}
                  className="text-left px-5 py-3 rounded-xl text-sm font-medium transition-all border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                  style={{ color: 'var(--ink-700)' }}
                >
                  {i + 1}. {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl font-bold" style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}>
              {profile.type[0]}
            </div>
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--ink-900)' }}>{profile.type} Yatırımcı</div>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-500)' }}>{profile.desc}</p>
            <button
              onClick={() => { setStep(0); setAnswers([]); setProfile(null); }}
              className="text-sm flex items-center gap-2 mx-auto font-medium"
              style={{ color: 'var(--brand-hover)' }}
            >
              <RefreshCw size={14} /> Tekrar Dene
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PredictionPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('AKBNK');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const runPrediction = async () => {
    setLoading(true);
    setPrediction(null);
    await new Promise(r => setTimeout(r, 1200));
    setPrediction(generatePrediction(selectedSymbol));
    setLoading(false);
  };

  useEffect(() => {
    runPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSymbol]);

  const isUp = prediction?.prediction_label === 'UP';
  const probPct = prediction ? Math.round(prediction.probability * 100) : 0;

  return (
    <div className="pt-24">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Sparkles size={13} />
              Tahminleme
            </div>
            <h1 className="text-responsive-hero font-extrabold mb-4" style={{ color: 'var(--ink-900)' }}>
              Fiyat yönünü önceden görün
            </h1>
            <p className="text-xl" style={{ color: 'var(--ink-500)' }}>
              Karmaşık verileri değil, net sonuçları görün.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="flex flex-col gap-4">
              <div className="card p-6">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--ink-900)' }}>Sembol Seç</h3>
                <div className="flex flex-col gap-2">
                  {stocks.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSymbol(s)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-left border"
                      style={{
                        background: selectedSymbol === s ? 'var(--brand-tint)' : 'white',
                        borderColor: selectedSymbol === s ? '#C7D2FE' : 'var(--border-subtle)',
                        color: selectedSymbol === s ? 'var(--ink-900)' : 'var(--ink-500)',
                      }}
                    >
                      <span className="font-mono font-semibold">{s}</span>
                      {selectedSymbol === s && <Zap size={14} style={{ color: 'var(--brand-hover)' }} />}
                    </button>
                  ))}
                </div>
              </div>

              <RiskProfile />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="card p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--ink-500)' }}>Tahmin</div>
                    <div className="font-mono text-xl font-bold" style={{ color: 'var(--ink-900)' }}>{selectedSymbol}</div>
                  </div>
                  <button
                    onClick={runPrediction}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{ background: 'var(--brand-tint)', color: 'var(--brand-hover)' }}
                  >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    Yenile
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 py-12">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 animate-spin" style={{ borderColor: 'var(--brand) transparent transparent transparent' }} />
                        <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-tint)' }}>
                          <Sparkles size={24} style={{ color: 'var(--brand-hover)' }} />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium" style={{ color: 'var(--ink-900)' }}>Analiz ediliyor...</div>
                      </div>
                    </motion.div>
                  ) : prediction ? (
                    <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                        <div className="flex items-center gap-5">
                          <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center"
                            style={{ background: isUp ? 'var(--success-tint)' : 'var(--danger-tint)' }}
                          >
                            {isUp ? <TrendingUp size={36} style={{ color: 'var(--success)' }} /> : <TrendingDown size={36} style={{ color: 'var(--danger)' }} />}
                          </div>
                          <div>
                            <div className="text-4xl font-extrabold" style={{ color: isUp ? 'var(--success)' : 'var(--danger)' }}>
                              {prediction.prediction_label}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--ink-500)' }}>Sonraki gün fiyat yönü</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm mb-1" style={{ color: 'var(--ink-500)' }}>Güven Oranı</div>
                          <div className="text-5xl font-bold font-mono" style={{ color: isUp ? 'var(--success)' : 'var(--danger)' }}>%{probPct}</div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--ink-500)' }}>
                          <span>DOWN</span>
                          <span>UP</span>
                        </div>
                        <div className="h-3 rounded-full overflow-hidden bg-[var(--bg-subtle)]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: isUp ? 'var(--success)' : 'var(--danger)' }}
                            initial={{ width: '50%' }}
                            animate={{ width: `${probPct}%` }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                          />
                        </div>
                        <div className="text-center text-sm mt-2 font-medium" style={{ color: 'var(--ink-500)' }}>
                          Son kapanış: <span className="font-mono" style={{ color: 'var(--ink-900)' }}>₺{prediction.last_close}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-start gap-2 p-3 rounded-xl text-xs bg-[#FFFBEB]" style={{ color: 'var(--amber)' }}>
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        Bu tahminler yatırım tavsiyesi değildir.
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
