import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Fingerprint, KeyRound, Lock, ServerCog, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n';

const SECURITY_ICONS = [Lock, Fingerprint, KeyRound, Eye, ServerCog, ShieldCheck] as const;

export function Security() {
  const { t } = useTranslation();
  const securityFeatures = t.security.items.map((item, i) => ({
    ...item,
    icon: SECURITY_ICONS[i],
  }));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="guvenlik" className="relative bg-[var(--bg-subtle)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--brand-hover)' }}>
            {t.security.badge}
          </p>
          <h2 className="text-responsive-section mb-4 font-bold" style={{ color: 'var(--ink-900)' }}>
            {t.security.title}
          </h2>
          <p className="text-base sm:text-lg" style={{ color: 'var(--ink-500)' }}>
            {t.security.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {securityFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.45 }}
              className="shine-hover flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-5"
            >
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'var(--success-tint)' }}
              >
                <feat.icon size={17} style={{ color: 'var(--success)' }} />
              </div>
              <div>
                <div className="mb-0.5 text-sm font-semibold" style={{ color: 'var(--ink-900)' }}>{feat.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-500)' }}>{feat.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
