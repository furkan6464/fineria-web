import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { AppMockupImage } from './AppMockupImage';
import { useTranslation } from '@/i18n';

import anaSayfaMockup from '@/assets/app-mockups/ana-sayfa.svg';
import piyasalarMockup from '@/assets/app-mockups/piyasalar.svg';
import tahminlemeMockup from '@/assets/app-mockups/tahminleme.svg';
import tahminleme2Mockup from '@/assets/app-mockups/tahminleme-2.svg';
import yapayZekaMockup from '@/assets/app-mockups/yapay-zeka.svg';
import gundemMockup from '@/assets/app-mockups/gundem.svg';
import haberlerMockup from '@/assets/app-mockups/haberler.svg';

function buildScreens(t: ReturnType<typeof useTranslation>['t']) {
  return [
    { key: 'ana-sayfa', label: t.mobile.screens.home, src: anaSayfaMockup },
    { key: 'piyasalar', label: t.mobile.screens.markets, src: piyasalarMockup },
    { key: 'tahminleme', label: t.mobile.screens.predictions, src: tahminlemeMockup },
    { key: 'tahminleme-2', label: t.mobile.screens.analysisDetail, src: tahminleme2Mockup },
    { key: 'yapay-zeka', label: t.mobile.screens.analysis, src: yapayZekaMockup },
    { key: 'gundem', label: t.mobile.screens.agenda, src: gundemMockup },
    { key: 'haberler', label: t.mobile.screens.news, src: haberlerMockup },
  ];
}

function AppStoreBadge({ soon }: { soon: string }) {
  return (
    <svg viewBox="0 0 119.66 40" xmlns="http://www.w3.org/2000/svg" width="118" height="40" aria-hidden>
      <rect width="119.66" height="40" rx="8" fill="#0F172A" />
      <path d="M24.77 20a5.27 5.27 0 0 1 2.5-4.43 5.38 5.38 0 0 0-4.25-2.3c-1.79-.19-3.52 1.07-4.43 1.07-.93 0-2.32-1.05-3.83-1a5.66 5.66 0 0 0-4.76 2.91c-2.06 3.56-.52 8.8 1.45 11.69 1 1.41 2.14 3 3.65 2.91s2-.93 3.82-.93 2.28.93 3.83.9 2.6-1.42 3.56-2.84a12.31 12.31 0 0 0 1.62-3.28 5.1 5.1 0 0 1-3.16-4.7z" fill="#fff" />
      <path d="M21.87 11.28a5.17 5.17 0 0 0 1.18-3.71 5.26 5.26 0 0 0-3.41 1.77 4.93 4.93 0 0 0-1.21 3.56 4.36 4.36 0 0 0 3.44-1.62z" fill="#fff" />
      <text x="33" y="16" fontSize="7" fill="#fff" fontFamily="Arial" opacity="0.85">{soon}</text>
      <text x="32" y="28" fontSize="11.5" fill="#fff" fontFamily="Arial" fontWeight="bold">App Store</text>
    </svg>
  );
}

function PlayStoreBadge({ soon }: { soon: string }) {
  return (
    <svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" width="128" height="40" aria-hidden>
      <rect width="135" height="40" rx="8" fill="#0F172A" />
      <path d="M9.5 7.5l14.5 8.4-3.3 3.3L9.5 7.5z" fill="#ea4335" />
      <path d="M7 8.2v23.6l12.7-11.8L7 8.2z" fill="#4285f4" />
      <path d="M24.2 24.1l-3.5-3.4L7 31.8l17.2-7.7z" fill="#fbbc05" />
      <path d="M24.2 15.9L7 8.2l13.7 12.5 3.5-4.8z" fill="#34a853" />
      <text x="33" y="16" fontSize="7" fill="#fff" fontFamily="Arial" opacity="0.85">{soon}</text>
      <text x="32" y="28" fontSize="11.5" fill="#fff" fontFamily="Arial" fontWeight="bold">Google Play</text>
    </svg>
  );
}

export function MobileShowcase() {
  const { t } = useTranslation();
  const screens = buildScreens(t);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 flex items-start justify-center gap-3 sm:gap-5 lg:order-1 lg:gap-6"
          >
            <div className="relative w-[58%] max-w-[210px] flex-shrink-0 sm:w-auto sm:max-w-[260px] lg:max-w-[300px]">
              <div
                className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-2xl sm:-inset-14"
                style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 65%)' }}
              />
              <div className="light-sweep light-sweep-soft rounded-[1.4rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screens[active].key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <AppMockupImage src={screens[active].src} label={screens[active].label} width={300} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1 sm:max-w-[150px] sm:flex-none sm:gap-1 sm:pt-4">
              {screens.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="rounded-lg px-2.5 py-1.5 text-left text-[12.5px] font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm"
                  style={{
                    background: active === i ? 'var(--brand-tint)' : 'transparent',
                    color: active === i ? 'var(--brand-hover)' : 'var(--ink-500)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
              Mobil
            </p>
            <h2 className="text-responsive-section mb-5 font-bold" style={{ color: 'var(--ink-900)' }}>
              {t.mobile.title}
            </h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--ink-500)' }}>
              {t.mobile.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="relative inline-flex opacity-90" aria-label={`App Store · ${t.mobile.soon}`}>
                <AppStoreBadge soon={t.mobile.soon} />
              </span>
              <span className="relative inline-flex opacity-90" aria-label={`Google Play · ${t.mobile.soon}`}>
                <PlayStoreBadge soon={t.mobile.soonUpper} />
              </span>
            </div>
            <p className="mt-4 text-sm font-medium" style={{ color: 'var(--brand-hover)' }}>
              {t.mobile.storeNote}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
