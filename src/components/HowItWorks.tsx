import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, LineChart, SlidersHorizontal, TrendingUp, UserPlus } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Hesabını aç',
    description: 'Birkaç adımda ücretsiz hesabını oluştur.',
    detail: 'Dakikalar',
  },
  {
    icon: SlidersHorizontal,
    title: 'Profilini belirle',
    description: 'Hedefine uygun bir risk görünümü çıkar.',
    detail: 'Kısa anket',
  },
  {
    icon: TrendingUp,
    title: 'Varlıklarını ekle',
    description: 'Takip etmek istediğin sembolleri seç.',
    detail: 'Tek ekran',
  },
  {
    icon: LineChart,
    title: 'Akışı izle',
    description: 'Piyasa ve portföyü aynı yerden oku.',
    detail: 'Web · yakında mobil',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="nasil-calisir" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl sm:mb-16"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
            Nasıl çalışır
          </p>
          <h2 className="text-responsive-section font-bold" style={{ color: 'var(--ink-900)' }}>
            Dört adım. Karmaşa yok.
          </h2>
          <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--ink-500)' }}>
            Hesaptan ilk takibe kadar sade bir akış.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="shine-hover group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[var(--border-subtle)]">
                  <step.icon size={18} style={{ color: 'var(--brand-hover)' }} />
                </div>
                <span className="font-mono text-xs font-semibold tracking-[0.14em]" style={{ color: 'var(--ink-400)' }}>
                  0{i + 1}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--ink-900)' }}>{step.title}</h3>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--ink-500)' }}>{step.description}</p>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--brand-hover)' }}>
                {step.detail}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex justify-start sm:mt-14"
        >
          <a href="/kayit" className="btn-primary flex items-center gap-2 text-base">
            <span>Ücretsiz Hesap Aç</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
