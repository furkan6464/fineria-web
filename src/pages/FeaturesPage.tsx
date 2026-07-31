import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BellRing,
  BrainCircuit,
  CandlestickChart,
  Gauge,
  Globe2,
  LineChart,
  Lock,
  Newspaper,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { CTA } from '@/components/CTA';

const pillars = [
  {
    eyebrow: '01 — Finans',
    title: 'Piyasayı tek panelde oku',
    desc: 'BIST, Amerikan Borsası ve kripto fiyatlarını, değişimleri ve trendleri sade bir akışta takip edin.',
    points: ['Canlı fiyat ve yüzde değişim', 'Takip listesi ve hızlı arama', 'Gürültüsüz piyasa paneli'],
    icon: CandlestickChart,
    href: '/piyasalar',
    cta: 'Piyasaları keşfet',
  },
  {
    eyebrow: '02 — Tahminleme',
    title: 'Yön görünümü, net sinyal',
    desc: 'Model geçmiş veriyi ve teknik göstergeleri okuyarak Al / Sat / Tut tarzı bir yön görünümü üretir.',
    points: ['Fiyat, haber ve sosyal akış girdileri', 'Attention-LSTM mimarisi', 'Risk profiliyle birlikte okuma'],
    icon: BrainCircuit,
    href: '/tahminleme',
    cta: 'Tahminlemeyi gör',
  },
];

const gridFeatures = [
  {
    icon: LineChart,
    title: 'Canlı piyasa verisi',
    desc: 'Hisse ve kripto hareketlerini gecikmesiz izleyin.',
    span: 'sm:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'Yön sinyali',
    desc: 'Model çıktısıyla yükseliş, düşüş veya yatay görünüm.',
    span: '',
  },
  {
    icon: Newspaper,
    title: 'Piyasa gündemi',
    desc: 'Fiyatı haber ve gelişmelerle birlikte takip edin.',
    span: '',
  },
  {
    icon: Gauge,
    title: 'Risk profili',
    desc: 'Kısa değerlendirme ile risk toleransınızı görün.',
    span: '',
  },
  {
    icon: Activity,
    title: 'Teknik göstergeler',
    desc: 'RSI, MACD ve güven skoru model çıktısıyla birlikte.',
    span: 'sm:col-span-2',
  },
  {
    icon: Globe2,
    title: 'Üç piyasa, tek hesap',
    desc: 'BIST · Amerikan Borsası · Kripto',
    span: '',
  },
  {
    icon: BellRing,
    title: 'Akıllı bildirimler',
    desc: 'Takip ettiğiniz varlıklar için anlık uyarılar.',
    span: '',
  },
  {
    icon: ShieldCheck,
    title: 'Güvenli oturum',
    desc: 'Şifreli iletişim ve hesaba özel tahminleme erişimi.',
    span: '',
  },
  {
    icon: Smartphone,
    title: 'Web şimdi, mobil yakında',
    desc: 'Tarayıcıda kullanın; iOS ve Android yolda.',
    span: 'sm:col-span-2',
  },
  {
    icon: Lock,
    title: 'Hesaba bağlı motor',
    desc: 'Canlı tahmin çıktısı güvenli oturum üzerinden gelir.',
    span: '',
  },
  {
    icon: TrendingUp,
    title: 'Portföy odaklı bakış',
    desc: 'Piyasanın tamamı değil, sizin için önemli olan.',
    span: '',
  },
];

const flow = [
  { step: '01', title: 'Piyasayı tarayın', text: 'BIST, ABD ve kripto varlıklarını keşfedin.' },
  { step: '02', title: 'Sembol seçin', text: 'Tahminleme desteklenen sembollerde çalışır.' },
  { step: '03', title: 'Yönü okuyun', text: 'Model Al / Sat / Tut görünümü üretir.' },
  { step: '04', title: 'Kararı size bırakır', text: 'Çıktı yatırım tavsiyesi değildir.' },
];

export function FeaturesPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="overflow-hidden">
      {/* Hero — full-bleed under navbar (no white gap) */}
      <section
        data-chrome="dark"
        className="relative bg-[#05060a] pb-16 pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-28"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 0%, rgba(79,70,229,0.28), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-indigo-300/80">
              Özellikler
            </p>
            <h1
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
            >
              Finans araçları ve
              <span className="block text-white/55">tahminleme bir arada.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/45 sm:text-lg">
              Canlı piyasa takibi, yön sinyali, risk profili ve gündem —
              yatırım kararınızı destekleyen her katman Fineria Finance’te.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two product pillars */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-2 lg:gap-6">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="shine-hover relative overflow-hidden rounded-[1.75rem] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-7 sm:p-9"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-[var(--border-subtle)]">
                <pillar.icon size={22} strokeWidth={1.5} style={{ color: 'var(--brand-hover)' }} />
              </div>
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--brand-hover)' }}>
                {pillar.eyebrow}
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-[1.7rem]" style={{ color: 'var(--ink-900)' }}>
                {pillar.title}
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: 'var(--ink-500)' }}>
                {pillar.desc}
              </p>
              <ul className="mt-6 space-y-2.5">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--ink-700)' }}>
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: 'var(--brand)' }} />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to={pillar.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: 'var(--brand-hover)' }}
              >
                {pillar.cta}
                <ArrowRight size={15} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Bento capability grid */}
      <section className="bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 max-w-xl sm:mb-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
              Neler var
            </p>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              Karar sürecinizi saran araçlar
            </h2>
            <p className="mt-3 text-base" style={{ color: 'var(--ink-500)' }}>
              Piyasa verisinden model çıktısına, riskten bildirime kadar uçtan uca.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {gridFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: (i % 6) * 0.04, duration: 0.45 }}
                className={`shine-hover rounded-2xl border border-[var(--border-subtle)] bg-white p-5 sm:p-6 ${feat.span}`}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'var(--brand-tint)' }}
                >
                  <feat.icon size={18} style={{ color: 'var(--brand-hover)' }} />
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--ink-900)' }}>{feat.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              Nasıl bir araya geliyor?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base" style={{ color: 'var(--ink-500)' }}>
              Finans paneli ile tahminleme motoru aynı ürün deneyiminde çalışır.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="rounded-2xl border border-[var(--border-subtle)] p-5"
              >
                <div className="mb-4 font-mono text-xs font-semibold" style={{ color: 'var(--brand-hover)' }}>
                  {item.step}
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--ink-900)' }}>{item.title}</h3>
                <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-500)' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
