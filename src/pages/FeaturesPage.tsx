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
import { useTranslation } from '@/i18n';

const PILLAR_META = [
  { icon: CandlestickChart, href: '/piyasalar' },
  { icon: BrainCircuit, href: '/tahminleme' },
] as const;

const GRID_ICONS = [
  LineChart,
  Sparkles,
  Newspaper,
  Gauge,
  Activity,
  Globe2,
  BellRing,
  ShieldCheck,
  Smartphone,
  Lock,
  TrendingUp,
] as const;

const GRID_SPANS = [
  'sm:col-span-2',
  '',
  '',
  '',
  'sm:col-span-2',
  '',
  '',
  '',
  'sm:col-span-2',
  '',
  '',
] as const;

export function FeaturesPage() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="overflow-hidden">
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
              {t.featuresPage.hero.eyebrow}
            </p>
            <h1
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
            >
              {t.featuresPage.hero.titleLine1}
              <span className="block text-white/55">{t.featuresPage.hero.titleLine2}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/45 sm:text-lg">
              {t.featuresPage.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-2 lg:gap-6">
          {t.featuresPage.pillars.map((pillar, i) => {
            const meta = PILLAR_META[i];
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="shine-hover relative overflow-hidden rounded-[1.75rem] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-7 sm:p-9"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-[var(--border-subtle)]">
                  <meta.icon size={22} strokeWidth={1.5} style={{ color: 'var(--brand-hover)' }} />
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
                  to={meta.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: 'var(--brand-hover)' }}
                >
                  {pillar.cta}
                  <ArrowRight size={15} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 max-w-xl sm:mb-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
              {t.featuresPage.grid.eyebrow}
            </p>
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              {t.featuresPage.grid.title}
            </h2>
            <p className="mt-3 text-base" style={{ color: 'var(--ink-500)' }}>
              {t.featuresPage.grid.subtitle}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {t.featuresPage.grid.features.map((feat, i) => {
              const Icon = GRID_ICONS[i];
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: (i % 6) * 0.04, duration: 0.45 }}
                  className={`shine-hover rounded-2xl border border-[var(--border-subtle)] bg-white p-5 sm:p-6 ${GRID_SPANS[i] ?? ''}`}
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: 'var(--brand-tint)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--brand-hover)' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--ink-900)' }}>{feat.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
              {t.featuresPage.flow.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base" style={{ color: 'var(--ink-500)' }}>
              {t.featuresPage.flow.subtitle}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.featuresPage.flow.steps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="rounded-2xl border border-[var(--border-subtle)] p-5"
              >
                <div className="mb-4 font-mono text-xs font-semibold" style={{ color: 'var(--brand-hover)' }}>
                  {String(i + 1).padStart(2, '0')}
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
