import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { LayoutDashboard, LineChart, Radar, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n';

const PlatformVideo = lazy(() =>
  import('@/components/PlatformVideo').then((m) => ({ default: m.PlatformVideo })),
);

const CAPABILITY_ICONS = [LayoutDashboard, Radar, LineChart, ShieldCheck] as const;

function useIsDesktopVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return enabled;
}

export function PlatformShowcase() {
  const { t } = useTranslation();
  const capabilities = t.platform.items.map((item, i) => ({
    ...item,
    icon: CAPABILITY_ICONS[i],
  }));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const showVideo = useIsDesktopVideo();

  return (
    <section className="relative overflow-hidden bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24 content-visibility-auto">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className={`grid items-center gap-12 lg:gap-16 ${showVideo ? 'lg:grid-cols-2' : ''}`}>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 flex justify-center lg:order-1"
            >
              <Suspense fallback={<div className="h-[420px] w-full max-w-sm" aria-hidden />}>
                <PlatformVideo />
              </Suspense>
            </motion.div>
          )}

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={showVideo ? 'order-1 lg:order-2' : ''}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
              {t.platform.badge}
            </p>
            <h2 className="text-responsive-section mb-5 font-bold" style={{ color: 'var(--ink-900)' }}>
              {t.platform.titleLine1}
              <span className="block" style={{ color: 'var(--brand-hover)' }}>
                {t.platform.titleLine2}
              </span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed sm:text-lg lg:mb-9" style={{ color: 'var(--ink-500)' }}>
              {t.platform.subtitle}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item, i) => (
                <motion.div
                  key={`capability-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.45 }}
                  className="shine-hover rounded-2xl border border-[var(--border-subtle)] bg-white p-4"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-tint)]">
                    <item.icon size={17} style={{ color: 'var(--brand-hover)' }} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{item.title}</div>
                  <div className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
