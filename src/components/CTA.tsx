import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ctaHandMockup from '@/assets/app-mockups/cta-hand-mockup.webp';
import { useTranslation } from '@/i18n';

export function CTA() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="ambient-mesh-dark light-sweep light-sweep-dark relative grid items-stretch overflow-hidden rounded-[1.75rem] lg:grid-cols-2"
        >
          <div className="relative hidden min-h-[420px] items-end justify-center overflow-hidden lg:flex">
            <div
              className="absolute -inset-10 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, transparent 65%)' }}
              aria-hidden
            />
            <img
              src={ctaHandMockup}
              alt={t.cta.imageAlt}
              className="relative -mb-8 h-auto w-[420px] xl:w-[480px]"
              style={{
                filter:
                  'drop-shadow(0 25px 20px rgba(0,0,0,0.35)) drop-shadow(0 45px 55px rgba(0,0,0,0.3))',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 md:px-12">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
              {t.cta.badge}
            </p>
            <h2
              className="mb-4 font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}
            >
              {t.cta.titleLine1}
              <br />
              {t.cta.titleLine2}
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: '#A8B2C7' }}>
              {t.cta.subtitle}
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="/kayit" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
                <span>{t.cta.primary}</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="/giris"
                className="rounded-xl border border-white/15 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/5"
              >
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
