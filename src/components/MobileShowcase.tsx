import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { BarChart3, Gauge, Bitcoin, SlidersHorizontal } from 'lucide-react';
import { AppMockupImage } from './AppMockupImage';

import anaSayfaMockup from '@/assets/app-mockups/ana-sayfa.svg';
import piyasalarMockup from '@/assets/app-mockups/piyasalar.svg';
import tahminlemeMockup from '@/assets/app-mockups/tahminleme.svg';
import tahminleme2Mockup from '@/assets/app-mockups/tahminleme-2.svg';
import yapayZekaMockup from '@/assets/app-mockups/yapay-zeka.svg';
import gundemMockup from '@/assets/app-mockups/gundem.svg';
import haberlerMockup from '@/assets/app-mockups/haberler.svg';

const screens = [
  { key: 'ana-sayfa', label: 'Ana Sayfa', src: anaSayfaMockup },
  { key: 'piyasalar', label: 'Piyasalar', src: piyasalarMockup },
  { key: 'tahminleme', label: 'Tahminleme', src: tahminlemeMockup },
  { key: 'tahminleme-2', label: 'Analiz Detayı', src: tahminleme2Mockup },
  { key: 'yapay-zeka', label: 'Yapay Zeka', src: yapayZekaMockup },
  { key: 'gundem', label: 'Gündem', src: gundemMockup },
  { key: 'haberler', label: 'Haberler', src: haberlerMockup },
];

const appStats = [
  { label: 'BIST Hisse Senedi', value: '500+', icon: BarChart3 },
  { label: 'Kripto Para', value: '250+', icon: Bitcoin },
  { label: 'Anlık Veri Gecikmesi', value: '<1sn', icon: Gauge },
  { label: 'Teknik Gösterge', value: '20+', icon: SlidersHorizontal },
];

function AppStoreBadge() {
  return (
    <svg viewBox="0 0 119.66 40" xmlns="http://www.w3.org/2000/svg" width="118" height="40">
      <rect width="119.66" height="40" rx="8" fill="#0F172A" />
      <path d="M24.77 20a5.27 5.27 0 0 1 2.5-4.43 5.38 5.38 0 0 0-4.25-2.3c-1.79-.19-3.52 1.07-4.43 1.07-.93 0-2.32-1.05-3.83-1a5.66 5.66 0 0 0-4.76 2.91c-2.06 3.56-.52 8.8 1.45 11.69 1 1.41 2.14 3 3.65 2.91s2-.93 3.82-.93 2.28.93 3.83.9 2.6-1.42 3.56-2.84a12.31 12.31 0 0 0 1.62-3.28 5.1 5.1 0 0 1-3.16-4.7z" fill="#fff" />
      <path d="M21.87 11.28a5.17 5.17 0 0 0 1.18-3.71 5.26 5.26 0 0 0-3.41 1.77 4.93 4.93 0 0 0-1.21 3.56 4.36 4.36 0 0 0 3.44-1.62z" fill="#fff" />
      <text x="33" y="16" fontSize="7" fill="#fff" fontFamily="Arial" opacity="0.85">İndirin</text>
      <text x="32" y="28" fontSize="11.5" fill="#fff" fontFamily="Arial" fontWeight="bold">App Store</text>
    </svg>
  );
}

function PlayStoreBadge() {
  return (
    <svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" width="128" height="40">
      <rect width="135" height="40" rx="8" fill="#0F172A" />
      <path d="M9.5 7.5l14.5 8.4-3.3 3.3L9.5 7.5z" fill="#ea4335" />
      <path d="M7 8.2v23.6l12.7-11.8L7 8.2z" fill="#4285f4" />
      <path d="M24.2 24.1l-3.5-3.4L7 31.8l17.2-7.7z" fill="#fbbc05" />
      <path d="M24.2 15.9L7 8.2l13.7 12.5 3.5-4.8z" fill="#34a853" />
      <text x="33" y="16" fontSize="7" fill="#fff" fontFamily="Arial" opacity="0.85">EDİNİN</text>
      <text x="32" y="28" fontSize="11.5" fill="#fff" fontFamily="Arial" fontWeight="bold">Google Play</text>
    </svg>
  );
}

export function MobileShowcase() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--bg-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone + tab selector */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center items-start gap-6 order-2 lg:order-1"
          >
            <div className="relative">
              <div
                className="absolute -inset-14 rounded-full opacity-70 -z-10"
                style={{ background: 'radial-gradient(ellipse, #F1F3FE 0%, transparent 65%)' }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={screens[active].key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <AppMockupImage src={screens[active].src} label={screens[active].label} width={300} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {screens.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setActive(i)}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="badge badge-brand mb-5 w-fit">Mobil Uygulama</div>
            <h2 className="text-responsive-section font-bold mb-5" style={{ color: 'var(--ink-900)' }}>
              Yatırımlarınız, her zaman cebinizde
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--ink-500)' }}>
              Tüm piyasaları cebinizden takip edin.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {appStats.map((item) => (
                <div key={item.label} className="card p-4 flex items-start gap-3">
                  <item.icon size={18} style={{ color: 'var(--brand-hover)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="text-xl font-bold" style={{ color: 'var(--ink-900)' }}>{item.value}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-500)' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#" aria-label="App Store'dan indirin">
                <AppStoreBadge />
              </a>
              <a href="#" aria-label="Google Play'den indirin">
                <PlayStoreBadge />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
